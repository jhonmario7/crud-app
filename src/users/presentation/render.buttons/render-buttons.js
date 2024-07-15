import usersStore from '../../store/users-store';
import userstore from '../../store/users-store';
import { renderTable } from '../render.table/render-table';
import './render-buttons.css';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = (element) => {


    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next >'

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '< Prev'

    const currentPegeLabel = document.createElement('Span');
    currentPegeLabel.id = 'current-page'
    currentPegeLabel.innerText = usersStore.getCurrentPage();

    element.append( prevButton, currentPegeLabel, nextButton );

    nextButton.addEventListener  ('click' , async() => {

      await usersStore.loadNextPage();
      currentPegeLabel.innerText = usersStore.getCurrentPage(); //Tenemos actualizado cual es el nuevo valor.
      renderTable(element);
    });

    prevButton.addEventListener ('click', async() =>{

      await usersStore.loadPreviousPage();
      currentPegeLabel.innerText = usersStore.getCurrentPage(); 
      renderTable(element);

    })






}



