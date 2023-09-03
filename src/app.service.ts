import { Injectable } from '@nestjs/common';
import { cloneDeep } from 'lodash';

type BoardType = {
  id: number,
  board_name: string,
  board_description?: string,
  board_done_color: string,
  board_accent_colors: string[],
  user_id: string,
}

type BoardDayType = {
  id: number,
  year_month_day: string,
  done_today: boolean,
  color_not_done_index?: number,
  notes?: string,
  board_id: number,
}

@Injectable()
export class AppService {
  // Fake data
  // ---------

  FAKE_USER_ID = '625a1503'
  FAKE_BOARD_ID_2 = 2
  FAKE_BOARD_ID_3 = 3

  FAKE_USER_DATA: { boards: BoardType[], board_days: BoardDayType[] } = {
    'boards': [
      {
        'id': 1,
        'board_name': 'Stretch', // (Empty)
        'board_description': undefined, 
        'board_done_color': '#2B3A67 (Blue and sand)',
        'board_accent_colors': ['#89AFD2', '#FFF8F0', '#F4D06F', '#FFC081'], // https://coolors.co/ffc081-f4d06f-fff8f0-89afd2-2b3a67
        'user_id': this.FAKE_USER_ID,
      },
      {
        'id': this.FAKE_BOARD_ID_2,
        'board_name': 'Study Greek', // (Spaced days)
        'board_description': '',
        'board_done_color': '#344E41 (Greens)', 
        'board_accent_colors': ['#588157', '#7E9971', '#A3B18A', '#DAD7CD'], // https://coolors.co/dad7cd-a3b18a-7e9971-588157-344e41
        'user_id': this.FAKE_USER_ID,
      },
      {
        'id': this.FAKE_BOARD_ID_3,
        'board_name': 'Walkrun', // (Consecutive days)
        'board_description': 'Test test description',
        'board_done_color': '#3C3371 (Purples)',
        'board_accent_colors': ['#7C6997', '#BDA0BC', '#C3D2D5', '#AFBDC0'], // https://coolors.co/afbdc0-c3d2d5-bda0bc-7c6997-3c3371-2b3a67-344e41
        'user_id': this.FAKE_USER_ID,
      },
    ],

    'board_days': [
      // BOARD 2
      {
        'id': 201,
        'year_month_day': '20230823', // Aug 23
        'done_today': true,
        'color_not_done_index': 2,
        'notes': '',
        'board_id': this.FAKE_BOARD_ID_2,
      },
      {
        'id': 202,
        'year_month_day': '20230825', // Aug 25
        'done_today': true,
        'color_not_done_index': undefined,
        'notes': '',
        'board_id': this.FAKE_BOARD_ID_2,
      },
      {
        'id': 203,
        'year_month_day': '20230901', // Sept 1
        'done_today': true,
        'color_not_done_index': undefined,
        'notes': undefined,
        'board_id': this.FAKE_BOARD_ID_2,
      },
      // BOARD 3
      {
        'id': 301,
        'year_month_day': '20230829', // Aug 29
        'done_today': true,
        'color_not_done_index': undefined,
        'notes': 'Tired',
        'board_id': this.FAKE_BOARD_ID_3,
      },
      {
        'id': 302,
        'year_month_day': '20230831', // missed a day, so now Aug 31
        'done_today': true,
        'color_not_done_index': undefined,
        'notes': undefined,
        'board_id': this.FAKE_BOARD_ID_3,
      },
      {
        'id': 303,
        'year_month_day': '20230901', // Sept 1
        'done_today': true,
        'color_not_done_index': undefined,
        'notes': undefined,
        'board_id': this.FAKE_BOARD_ID_3,
      },
      {
        'id': 304,
        'year_month_day': '20230903', // 'today', Sept 3
        'done_today': true,
        'color_not_done_index': 3,
        'notes': 'Feeling good',
        'board_id': this.FAKE_BOARD_ID_3,
      },
      {
        'id': 305,
        'year_month_day': '20230830', // Filled in Aug 30
        'done_today': false,
        'color_not_done_index': 0,
        'notes': undefined,
        'board_id': this.FAKE_BOARD_ID_3,
      },
      {
        'id': 306,
        'year_month_day': '20230822', // Filled in Aug 22 for fun
        'done_today': false,
        'color_not_done_index': 1,
        'notes': 'I guess I can add notes if not done, too',
        'board_id': this.FAKE_BOARD_ID_3,
      },
    ] 
  }

  // Helper functions
  // ---------
  private todaysYearMonthDay({yearMonthOnly = false}): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const date = today.getDate().toString().padStart(2, '0')
    // const month = ('0' + (today.getMonth() + 1)).slice(-2);
    // const date = ('0' + today.getDate()).slice(-2);
  
    if (yearMonthOnly) {
      return `${year}${month}`;
    } else {
      return `${year}${month}${date}`;
    }
  }

  // API functions
  // ---------

  getUserId(): string {
    return this.FAKE_USER_ID;
  }

  // getAllBoards() {
  //   return cloneDeep(this.FAKE_USER_DATA['boards']);
  // }

  private getIsDoneToday(board_id: number) {
    const today = this.todaysYearMonthDay({yearMonthOnly: false}); // todo? 
    const done_holder: BoardDayType[] = [];

    const all_board_days = this.FAKE_USER_DATA['board_days'];
    for (const day of all_board_days) {
      if (day.board_id === board_id && day.year_month_day === today && day.done_today) {
        done_holder.push(cloneDeep(day));
      }
    }

    // console.log(`\n\n done_holder: ${JSON.stringify(done_holder)}`)
    return (done_holder.length !== 0);
  }

  getAllBoardsWithDoneToday() {
    const boards_copy = cloneDeep(this.FAKE_USER_DATA['boards']);

    for (const board of boards_copy) {
      board['done_today'] = this.getIsDoneToday(board.id);
    }

    // console.log(`\n\n boards_copy: ${JSON.stringify(boards_copy)}`)
    return boards_copy;
  }

  private getBoardDays(board_id: number) {
    const board_days_result: BoardDayType[] = [];

    const all_board_days = this.FAKE_USER_DATA['board_days'];
    for (const day of all_board_days) {
      if (day.board_id === board_id) {
        board_days_result.push(cloneDeep(day));
      }
    }

    // console.log(`\n\n board_days_result: ${JSON.stringify(board_days_result)}`)
    return board_days_result;
  }

  getAllBoardsWithBoardDays() {
    const boards_copy = cloneDeep(this.FAKE_USER_DATA['boards']);

    for (const board of boards_copy) {
      board['board_days'] = this.getBoardDays(board.id);
    }

    // console.log(`\n\n boards_copy: ${JSON.stringify(boards_copy)}`)
    return boards_copy;
  }

  private getBoardById(board_id: number) {
    let board_result: BoardType = undefined;

    const all_boards = this.FAKE_USER_DATA['boards'];
    for (const board of all_boards) {
      if (board.id === board_id) {
        board_result = cloneDeep(board);
      }
    }

    // console.log(`\n\n board_result: ${JSON.stringify(board_result)}`)
    return board_result;
  }

  getBoardWithBoardDays(board_id: number) {
    const board = this.getBoardById(board_id);
    board['board_days'] = this.getBoardDays(board_id);

    // console.log(`\n\n board: ${JSON.stringify(board)}`)
    return board;
  }
  
}
