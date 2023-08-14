import React, { useEffect, useState } from 'react';
import './password-generator.css'

export default function PasswordGenerator(props) {
  const [allOptions, setAllOptions] = useState([
    {title : 'Uppercase letters', checked: false},
    {title : 'Lowercase letters', checked: false},
    {title : 'Symbols', checked: false},
    {title : 'Numbers', checked: false}
  ])
  const [charLength, setCharLength] = useState(4);
  const [password, setPassWord] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [copiedText, setCopiedText] = useState('COPY');

  useEffect(() => {
    setTimeout(()=> {
      setCopiedText('COPY')
    }, 1000)
  }, [copiedText])

  const handleChecks = (e) => {
    const checkedOptions = [...allOptions];
    const title = e.target.value;
    checkedOptions.forEach((opt) => {
      if (opt.title === title) {
        opt.checked = !opt.checked;
      }
    });
    setAllOptions(checkedOptions);
  }
  const copyPassword = () => {
    password && navigator.clipboard.writeText(password) && setCopiedText('COPIED');
  }
  const generatePassword = () => {
    const selectedOptions = allOptions.filter((option) => option.checked);
    if (selectedOptions.length < 1) {
      setErrorMsg(true);
      setPassWord('');
    } else {
      let passwordFormation = '';
    selectedOptions.forEach((option) => {
      if (option.title === 'Uppercase letters') {
        passwordFormation += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      } else if (option.title === 'Lowercase letters') {
        passwordFormation += 'abcdefghijklmnopqrstuvwxyz';
      } else if (option.title === 'Numbers') {
        passwordFormation += '0123456789';
      } else {
        passwordFormation += '!@#$%^&*()';
      }
    });
    let counter = 0;
    let result = '';
    while (counter < charLength) {
      result += passwordFormation.charAt(Math.floor(Math.random() * passwordFormation.length));
      counter += 1;
    }
    setPassWord(result);
    setErrorMsg(false);
    }
  }

  return (
    <main className='password-container'>
      <div className='copy-password'>
        <button onClick={copyPassword}>{copiedText}</button>
        {password && <span>{password}</span>}
      </div>
      <div className='selection'>
        {allOptions.map((option) => {
          return <>
            <input type='checkbox' value={option.title} checked={option.checked} onChange={(e) => handleChecks(e)} />
            <label>{option.title}</label><br />
          </>
        })}
      </div>
      <div className='pass-length'>
        <span>Characters: {charLength}</span>
        <input value={charLength} onChange={(e) => setCharLength(e.target.value)} type='range' min='4' max='20' />
      </div><br />
      <div style={{minHeight: '20px', textAlign: 'center'}}>{errorMsg && <span className='error'>select the options and set up a length of password</span>}</div>
      <div className='generate-btn'>
        <button onClick={() => generatePassword()}>Generate</button>
      </div>
    </main>
  );
}