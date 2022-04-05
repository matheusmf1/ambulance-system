import { React, Component } from "react";
import { ScheduleComponent, Inject, Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-react-schedule";
import { CalendarData } from "../../data/CalendarData";
import { loadCldr, L10n } from "@syncfusion/ej2-base";

import * as numberingSystems from "./culture-files/numberingSystems.json";
import * as gregorian from "./culture-files/ca-gregorian.json";
import * as numbers from "./culture-files/numbers.json";
import * as timeZoneNames from "./culture-files/timeZoneNames.json";

import { db, auth } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import './culture-files/calendar.css';


loadCldr( numberingSystems, gregorian, numbers, timeZoneNames );

L10n.load({
  pt: {
    schedule: {
      day: "Dia",
      week: "Semana",
      workWeek: "Semana de trabalho",
      month: "Mês",
      agenda: "Agenda",
      weekAgenda: "Agenda da semana",
      workWeekAgenda: "Agenda da Semana de Trabalho",
      monthAgenda: "Agenda do mês",
      today: "Hoje",
      noEvents: "Sem eventos",
      emptyContainer: "Não há eventos agendados para este dia.",
      allDay: "Dia todo",
      start: "Começar",
      end: "Fim",
      more: "Mais",
      close: "Fechar",
      cancel: "Cancelar",
      noTitle: "(Sem título)",
      delete: "Excluir",
      deleteEvent: "Este evento",
      deleteMultipleEvent: "Excluir vários eventos",
      selectedItems: "Itens selecionados",
      deleteSeries: "Série inteira",
      edit: "Editar",
      editSeries: "Série inteira",
      editEvent: "Este evento",
      createEvent: "Crio",
      subject: "Sujeito",
      addTitle: "Adicionar título",
      moreDetails: "Mais detalhes",
      save: "Salve ",
      editContent: "Como você gostaria de alterar o compromisso na série?",
      deleteContent: "Tem certeza de que deseja excluir este evento?",
      deleteMultipleContent:
        "Tem certeza de que deseja excluir os eventos selecionados?",
      newEvent: "Novo evento",
      title: "Título",
      location: "Localização",
      description: "Descrição",
      timezone: "Fuso horário",
      startTimezone: "Iniciar fuso horário",
      endTimezone: "Fuso horário final",
      repeat: "Repetir",
      saveButton: "Salve ",
      cancelButton: "Cancelar",
      deleteButton: "Excluir",
      recurrence: "Recorrência",
      wrongPattern: "O padrão de recorrência não é válido.",
      seriesChangeAlert:
        "Deseja cancelar as alterações feitas em instâncias específicas desta série e associá-las à série inteira novamente?",
      createError:
        "A duração do evento deve ser menor que a frequência com que ele ocorre. Diminua a duração ou altere o padrão de recorrência no editor de eventos de recorrência.",
      sameDayAlert:
        "Duas ocorrências do mesmo evento não podem ocorrer no mesmo dia.",
      editRecurrence: "Editar recorrência",
      repeats: "Repete",
      alert: "Alerta",
      startEndError: "A data final selecionada ocorre antes da data de início.",
      invalidDateError: "O valor da data inserida é inválido.",
      blockAlert:
        "Os eventos não podem ser agendados dentro do intervalo de tempo bloqueado.",
      ok: "Está bem",
      yes: "sim",
      no: "Não",
      occurrence: "Ocorrência",
      series: "Series",
      previous: "Anterior",
      next: "Próximo",
      timelineDay: "Dia da linha do tempo",
      timelineWeek: "Semana da Linha do Tempo",
      timelineWorkWeek: "Semana de trabalho da linha do tempo",
      timelineMonth: "Mês da linha do tempo",
      timelineYear: "Ano da Linha do Tempo",
      editFollowingEvent: "Eventos seguintes",
      deleteTitle: "Excluir evento",
      editTitle: "Editar evento",
      beginFrom: "Começar de",
      endAt: "Termina em"
    },
    recurrenceeditor: {
      none: "Nenhum",
      daily: "Diariamente",
      weekly: "Semanal",
      monthly: "Por mês",
      month: "Mês",
      yearly: "Anual",
      never: "Nunca",
      until: "Até",
      count: "Contagem",
      first: "Primeiro",
      second: "Segundo",
      third: "Terceiro",
      fourth: "Quarto",
      last: "Último",
      repeat: "Repetir",
      repeatEvery: "Repita cada",
      on: "Repetir em",
      end: "Fim",
      onDay: "Dia",
      days: "Dias)",
      weeks: "Semana (s)",
      months: "Mês (es)",
      years: "Anos)",
      every: "cada",
      summaryTimes: "tempo (s)",
      summaryOn: "em",
      summaryUntil: "até",
      summaryRepeat: "Repete",
      summaryDay: "dias)",
      summaryWeek: "semana (s)",
      summaryMonth: "mês (es)",
      summaryYear: "anos)",
      monthWeek: "Mês Semana",
      monthPosition: "Posição do mês",
      monthExpander: "Expansor do mês",
      yearExpander: "Expansor do ano",
      repeatInterval: "Intervalo de repetição"
    },
    calendar: {
      today: "Hoje"
    }
  }
});

class Calendar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      calendarData: {}
    }
  }

  componentDidMount = async () => {

    const customerCollectionRef = collection( db, `users/${auth.currentUser.uid}/calendar` )
    const queryResult = query( customerCollectionRef );
    const docSnap = await getDocs( queryResult );

    if ( docSnap.docs.length > 0 ) {
      let firebaseData = docSnap.docs.map( doc => ( {...doc.data()} ) )[0];
      this.setState( { calendarData: firebaseData } );
    }
    else {
      const localData = { dataSource: [] }
      this.setState( { calendarData: localData } );
    }
  };
  
  render() {

    const handleCalendarDataChange = async ( e ) => {

      if ( e.requestType === "eventCreated" || e.requestType === "eventChanged" || e.requestType === "eventRemoved"  ) {
        // console.log( 'Evento: ', e.requestType );
        
        this.state.calendarData.dataSource.map( data => {
          data.StartTime = data.StartTime.toString();
          data.EndTime = data.EndTime.toString();
          return data
        } )

        const calendarData = new CalendarData( { data: this.state.calendarData } );
        const result = await calendarData.addCalendarToFirebase();
  
        if ( result ) {
          alert( "Calendário atualizado com sucesso" )
        }
        else {
          alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." )
        }
      }

    }

    return(
      <main>
      {/* <main className="form__container"> */}
        <ScheduleComponent currentView="Month" locale="pt" eventSettings={this.state.calendarData} actionComplete={ ( e ) => handleCalendarDataChange( e ) }>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>

          </ScheduleComponent>
      </main>
      
    );
  }
}

export default Calendar;