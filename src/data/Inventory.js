import { async } from "@firebase/util";
import { doc, getDoc, setDoc, updateDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { db, auth } from "../firebase";

export class Inventory {

  constructor ( { data, id } ) {
    this.data = data;
    this.id = id;
  }

  addMaterialInventoryToFirebase = async () => {
    try {

      const refDoc = doc(db, `users/${auth.currentUser.uid}/inventory`, `${this.id}` )
      const docSnap = await getDoc( refDoc );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, `users/${auth.currentUser.uid}/inventory`, `${this.id}` ), this.data );
        return true;
      }

      else {
        alert( "Já existe um produto com esse código para esse fornecedor. Por favor verifique o código do produto, ou vá em editar para alterar suas informações." )
        return false
      }

      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getMaterialInventoryFromFirebase = async () => {

    try {
      const docRef = doc( db, `users/${auth.currentUser.uid}/inventory`, `${this.id}` );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateMaterialInventoryOnFirebase = async () => {
    try {
      const docRef = doc( db, `users/${auth.currentUser.uid}/inventory`, `${this.id}` );
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteMaterialInventoryFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, `users/${auth.currentUser.uid}/inventory`, `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }

  static checkInventory = ( inventoryData, selectedData ) => {

    return selectedData.map( selectedItem => {

      let inventoryDataItem = inventoryData.filter( inventoryItem => inventoryItem['id'] === selectedItem['codigo'] )[0];

      if ( inventoryDataItem ) {

        let inventoryQuantity = parseInt( inventoryDataItem['product_quantity'] ) - parseInt( selectedItem['quantidade'] );

        if ( inventoryQuantity > 0 ) {
          let newTotalValue = (parseFloat( inventoryQuantity ) * parseFloat( inventoryDataItem['product_value'] )).toFixed(2);
          return {
            ...inventoryDataItem,
            "hasQuantity": true,
            "product_quantity": inventoryQuantity.toString(),
            "product_totalValue": newTotalValue.toString(),
            "product_underQuantityLimit": parseInt( inventoryQuantity ) < parseInt( inventoryDataItem['product_quantityLimit'] ) ? true: false,
          }
        } else {
          return {
            "id": inventoryDataItem['id'],
            "hasQuantity": false,
            "product_quantity": inventoryDataItem['product_quantity']
          }
        }

      }
    });
  }

  static batchUpdateMaterialInventoryQuantity = async ( updateData ) => {
    const batch = writeBatch( db );

    try {
      updateData.forEach( item => {  
        const docRef = doc( db, `users/${auth.currentUser.uid}/inventory`, `${item['id']}` );
        batch.update( docRef, {
          "product_quantity": item['product_quantity'],
          "product_totalValue": item['product_totalValue'],
          "product_underQuantityLimit": item['product_underQuantityLimit']
        });        
      });
  
      await batch.commit();
      return Promise.resolve( true );
    } 
    catch (error) {
      console.error( error );
      return Promise.reject( error );
    }
  }

  // updateMaterialInventoryQuantity = async () => {
  //   try {
  //     const docRef = doc( db, `users/${auth.currentUser.uid}/inventory`, `${this.id}` );
  //     await updateDoc( docRef, {
  //       "product_quantity": this.data['product_quantity'],
  //       "product_totalValue": this.data['product_totalValue'],
  //       "product_underQuantityLimit": this.data['product_underQuantityLimit']
  //     });
  //     return true
      
  //   } catch (error) {
  //     console.error( error );
  //     return false
  //   }
  // }

}