import React from 'react';

const ModeSelector = (props) => {
  return (
    <div className='radioButtonDiv'>
      <form className='radioButtonForm'>
        <input
          checked={props.mode === 'monochrome'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          className='radio'
          value='monochrome'
          id='monochrome'
        />
        <label htmlFor='monochrome'>monochrome{'  '}</label>
        <input
          checked={props.mode === 'monochromeDark'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          className='radio'
          value='monochromeDark'
          id='monochromeDark'
        />
        <label htmlFor='monochromeDark'>monochrome dark{'  '}</label>
        <input
          checked={props.mode === 'monochromeLight'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          className='radio'
          value='monochromeLight'
          id='monochromeLight'
        />
        <label htmlFor='monochromeLight'>monochrome -light{'  '}</label>
        <input
          checked={props.mode === 'analogic'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          className='radio'
          value='analogic'
          id='analogic'
        />
        <label htmlFor='analogic'>analogic{'  '}</label>
        <input
          checked={props.mode === 'complement'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          className='radio'
          value='complement'
          id='complement'
        />
        <label htmlFor='complement'>complement{'  '}</label>
        <input
          checked={props.mode === 'analogicComplement'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          className='radio'
          value='analogicComplement'
          id='analogicComplement'
        />
        <label htmlFor='analogicComplement'>analogic complement{'  '}</label>
        <input
          checked={props.mode === 'triad'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          className='radio'
          value='triad'
          id='triad'
        />
        <label htmlFor='triad'>triad{'  '}</label>
        <input
          checked={props.mode === 'quad'}
          onChange={props.changeMode}
          type='radio'
          name='mode'
          className='radio'
          value='quad'
          id='quad'
        />
        <label htmlFor='quad'>quad{'  '}</label>
      </form>
    </div>
  );
};

export default ModeSelector;