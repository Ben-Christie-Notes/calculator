import { useState } from 'react';
import Screen from './Screen';
import ButtonGrid from './ButtonGrid';
import { evaluateArithmetic } from '../utilities/requests';

function Container() {
  const [screen, setScreen] = useState('');

  const operatorsArray = ['', '+', '-', '×', '÷'];

  async function buttonClickHandler(event) {
    const value = event.target.dataset.value;
    const lastChar = screen.charAt(screen.length - 1);
    if (
      !(operatorsArray.includes(lastChar) && operatorsArray.includes(value)) &&
      !['C', '='].includes(value)
    ) {
      setScreen(screen + value);
    }

    // call api endpoint if = clicked
    else if (value === '=') {
      const returnedValue = await evaluateArithmetic(screen);
      console.log(typeof returnedValue);
      setScreen(returnedValue);
    }
    //implement delete button
    else if (value === 'C') {
      setScreen('');
    }
  }

  return (
    <div className="h-3/5 w-1/4 bg-slate-200 rounded-[12px] shadow-lg flex justify-center items-center p-5">
      <div className="h-full w-full flex-col">
        <Screen screen={screen} />
        <ButtonGrid onButtonClick={buttonClickHandler} />
      </div>
    </div>
  );
}

export default Container;
