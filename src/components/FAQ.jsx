import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { useRecoilValue } from 'recoil';
import { ApiFaqState } from '../apiState';

function FAQ() {
    const Faqdata = useRecoilValue(ApiFaqState)
  return (
    <>
    <div className='mt-12'>
    <h1>Frequently Asked Questions</h1>
    </div>
    {Faqdata.map((item , i )=>(
          <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{item.question}</Accordion.Header>
        <Accordion.Body>
          {item.answer}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    ))}

    </>
  )
  
}

export default FAQ