import React, { useState } from 'react'

// Lightweight Tags input (chips) with Enter/comma/paste support
function TagsInput({ label, values, onChange, placeholder = 'Type and press Enter or comma' }) {
  const [input, setInput] = useState('')

  const addTag = (raw) => {
    const pieces = String(raw)
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(Boolean)
    if (!pieces.length) return
    // dedupe while preserving order
    const set = new Set(values)
    pieces.forEach(p => set.add(p))
    onChange(Array.from(set))
  }
 
  const removeAt = (idx) => {
    const next = values.filter((_, i) => i !== idx)
    onChange(next)
  }

  const onKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault()
      addTag(input)
      setInput('')
    }
    if (e.key === 'Backspace' && !input && values.length) {
      // remove last chip
      removeAt(values.length - 1)
    }
  }

  const onPaste = (e) => {
    const text = e.clipboardData.getData('text')
    if (text && /[\n,]/.test(text)) {
      e.preventDefault()
      addTag(text)
      setInput('')
    }
  }

  return (
    <div className="sm:col-span-2">
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <div className="w-full rounded-lg border border-gray-300 bg-white px-2 py-2">
        <div className="flex flex-wrap gap-2">
          {values.map((tag, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-800 text-sm px-3 py-1">
              {tag}
              <button type="button" className="text-gray-500 hover:text-gray-700" onClick={() => removeAt(idx)} aria-label={`Remove ${tag}`}>
                ×
              </button>
            </span>
          ))}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            className="min-w-[10ch] flex-1 bg-transparent outline-none px-2 py-1 placeholder-gray-400 text-gray-900"
            placeholder={placeholder}
          />
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-500">Press Enter or comma to add. Paste comma/newline separated lists.</p>
    </div>
  )
}

const AdminAddTest = () => {
  const [TestInfo , SetTestInfo] = useState({
    testName:"",
    price:"",
    report_time:"",
    tat:"",
    description:"",
    inclusions:"",
    // arrays for chips fields:
    disclaimers: [],
    features: [],
    why_book: [],
  })


  const [images , setimages] = useState({
  icon: null,
  image: null,
})
 
  
  


  const handleSave = () => {
    // Example payload (send directly; arrays are already arrays)
   try {
     const payload = { ...TestInfo }
     console.log('Save payload:', payload)
    
     


     
   } catch (error) {
    
   }
    // If using FormData with files later:
    // const fd = new FormData()
    // Object.entries(payload).forEach(([k,v]) => {
    //   if (Array.isArray(v)) v.forEach(item => fd.append(`${k}[]`, item))
    //   else fd.append(k, v)
    // })
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Add Test</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* testName */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Test Name</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400"
            placeholder="e.g. Full Body Checkup"
            value={TestInfo.testName}
            onChange={(e)=>SetTestInfo(p=>({...p, testName: e.target.value}))}
          />
        </div>

        {/* price */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Price</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400"
            placeholder="e.g. 1999"
            value={TestInfo.price}
            onChange={(e)=>SetTestInfo(p=>({...p, price: e.target.value}))}
          />
        </div>

        {/* report_time */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Report Time</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400"
            placeholder="e.g. 24 Hours"
            value={TestInfo.report_time}
            onChange={(e)=>SetTestInfo(p=>({...p, report_time: e.target.value}))}
          />
        </div>

        {/* tat */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">TAT</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400"
            placeholder="e.g. Same day collection"
            value={TestInfo.tat}
            onChange={(e)=>SetTestInfo(p=>({...p, tat: e.target.value}))}
          />
        </div>

        {/* description */}
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-2">Description</label>
          <textarea
            rows="3"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400"
            placeholder="Covers 70+ essential health tests"
            value={TestInfo.description}
            onChange={(e)=>SetTestInfo(p=>({...p, description: e.target.value}))}
          />
        </div>

        {/* inclusions */}
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-2">Inclusions</label>
          <textarea
            rows="2"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 placeholder-gray-400"
            placeholder="Blood, Urine, Cholesterol"
            value={TestInfo.inclusions}
            onChange={(e)=>SetTestInfo(p=>({...p, inclusions: e.target.value}))}
          />
          <p className="mt-1 text-xs text-gray-500">Tip: Separate items with commas</p>
        </div>

        {/* disclaimers (chips) */}
        <TagsInput
          label="Disclaimers"
          values={TestInfo.disclaimers}
          onChange={(arr)=>SetTestInfo(p=>({...p, disclaimers: arr}))}
          placeholder='e.g. "Fasting 10–12 hours", "Avoid alcohol 24 hours"'
        />

        {/* features (chips) */}
        <TagsInput
          label="Features"
          values={TestInfo.features}
          onChange={(arr)=>SetTestInfo(p=>({...p, features: arr}))}
          placeholder='e.g. "Free home collection", "Doctor consultation included"'
        />

        {/* why_book (chips) */}
        <TagsInput
          label="Why Book"
          values={TestInfo.why_book}
          onChange={(arr)=>SetTestInfo(p=>({...p, why_book: arr}))}
          placeholder='e.g. "Early detection of health issues"'
        />

        {/* icon and image (kept as-is, wire later if needed) */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Icon (image)</label>
          <input type="file" accept="image/*" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
          onChange={(e) =>  setimages(prev => ({ ...prev, icon: e.target.files[0] }))}

          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-2">Main Image</label>
          <input type="file" accept="image/*" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2" 
             onChange={(e) =>  setimages(prev => ({ ...prev, image: e.target.files[0] }))}
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center rounded-lg bg-[#6B4DE0] text-white px-5 py-2.5 font-medium"
          onClick={handleSave}
        >
          Save Test
        </button>
      </div>
    </section>
  )
}

export default AdminAddTest
