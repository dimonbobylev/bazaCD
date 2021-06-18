import {SoftCD} from '../model/SoftCD';

export class TestData {

  static softCDs: SoftCD[] = [
    { id: 1,
      inv: '123/7',
      date: new Date('2021-06-12'),
      article: 'K-420K',
      title: '2 ARM(3244, 5577)'
    },
    { id: 2,
      inv: '129/7',
      date: new Date('2021-04-11'),
      article: 'K-700',
      title: '2 ARM(3244, 5577)'
    },
    { id: 3,
      inv: '129/7',
      date: new Date('2021-05-11'),
      article: 'K-420K',
      title: 'all ARM'
    },
  ];
}
