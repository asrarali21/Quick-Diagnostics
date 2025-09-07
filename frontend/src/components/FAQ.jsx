import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { useRecoilValue } from 'recoil';
import { ApiFaqState } from '../apiState';
import { faqDataSelector } from '../store/faq.state';

function FAQ() {
    const Faqdata = useRecoilValue(faqDataSelector)
  return (
    <>
    <div className='mt-12 w-full max-w-7xl mx-auto'>
    <h1 style={{marginBottom:"20px", fontSize:"25px"}} className="text-2xl font-semibold text-gray-900 mb-8">Frequently Asked Questions</h1>
    <div className="bg-white rounded-2xl shadow p-2 sm:p-6">
      {Faqdata.map((item, i) => (
        <Accordion key={i} defaultActiveKey={null} className="mb-2 border-0 bg-transparent">
          <Accordion.Item eventKey="0" className="border-0 bg-transparent">
            <Accordion.Header style={{color:"#5A5766"}} className="text-base font-medium text-gray-800">{item.question}</Accordion.Header>
            <Accordion.Body  className="text-gray-600 bg-white">
              {item.answer}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
    </div>
    </>
  )
  
}

export default FAQ