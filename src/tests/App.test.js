import { render, screen } from '@testing-library/react';
import App from '../App';
import ContextProvide from '../context/contextProvider';

const renderWithContext = (component) => {
  return render(
  <ContextProvide>
    {component}
  </ContextProvide>
  )
}

describe('Testa a renderização inicial do timer', () => {
  it('verifica a renderização dos Botões, pauseBtn e StartBtn', () => {
    renderWithContext(<App />)
    const startBtn = screen.getByRole('button', {name: /Start/i})  
    expect(startBtn).toBeInTheDocument();
    const resetButton = screen.getByRole('button', {name: /Reset/i})  
    expect(resetButton).toBeInTheDocument();
  });

  // it('Verifica a renderização dos meus Inputs', () => {
  //   renderWithContext(<App />)
  //   const inputs = screen.getByRole('input')  
  //   expect(inputs).toHaveLength(2);
  // });
});
