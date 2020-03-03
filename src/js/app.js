import { ajax } from 'rxjs/ajax';
import { catchError, take, concatMap } from 'rxjs/operators';
import { of, interval } from 'rxjs';
import AddMsg from './AddMsg.js';

const elMessages = document.querySelector('.incom-messages');
const addMsg = new AddMsg(elMessages);
const url = 'https://ahj-11-1-1.herokuapp.com//messages/unread';

(() => {
  const numQuery = interval(5000);
  const takeFourNumbers = numQuery.pipe(take(5));
  const Aj = ajax.getJSON(url);

  takeFourNumbers
    .pipe(concatMap(() => Aj.pipe(catchError(() => of({ messages: [] })))))
    .subscribe((result) => {
      addMsg.addMessages(result.messages);
    });
})();
