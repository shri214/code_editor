import React from 'react'
import { Console, Header, TextArea } from './InputConsole'
import { BiExport } from 'react-icons/bi'


export const OutputConsole:React.FC<any> = ({currentOutput}) => {
  console.log("currentOutput:  ", currentOutput);
  console.log(encodeURIComponent(currentOutput))
  const outputString = typeof currentOutput === 'string' ? currentOutput : String(currentOutput);

  return (
    <Console>
      <Header>
        Output:

        <a
      href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentOutput)}`}
      download="output.txt"
    >
          <BiExport /> Export Output
        </a>

      </Header>
      <TextArea
        value={outputString}
        style={{ whiteSpace: 'pre-wrap' }} 
        disabled
      />
    </Console>
  )
}