const { useState, useMemo } = React;

const currencies = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 156.7,
    PHP: 58.45
};

export function CurrencyConverter() {
  const [currency, setCurrency] = useState({
    start: Object.keys(currencies)[0],
    target: Object.keys(currencies)[1],
    value: 1
  })

  const handleFormChange = (e) => {
    const {name, value} = e.target
    setCurrency((prev)=>({
      ...prev,
      [name]: name === "value" ? Number(value) : value
    }))
  }


  const memoizedCalculations = useMemo(() => {
    const amount = currency.value || 0; 
    
    const ratesMap = {};
    for (const key in currencies) {
      ratesMap[key] = ((amount * currencies[key]) / currencies[currency.start]).toFixed(2);
    }
    return ratesMap;
  }, [currency.start, currency.value]); 


  const convertCurrency = memoizedCalculations[currency.target];

  return(
    <div className="container">
      <h1>Currency Converter</h1>
      <form>
        <label htmlFor="start">Start Currency</label>
        <select id="start" value={currency.start} onChange={handleFormChange} name="start">
         {Object.entries(currencies).map(([key])=>(
           <option value={key} key={key}>{key}</option>
         ))}
        </select>

        <label htmlFor="target">Target Currency</label>
         <select id="target" value={currency.target} onChange={handleFormChange} name="target">
         {Object.entries(currencies).map(([key])=>(
           <option value={key} key={key}>{key}</option>
         ))}
        </select>

         <label htmlFor="value">{`${currency.value} ${currency.start} to ${currency.target} `}Value Conversion</label>
         <input type="number"
         min="1"
         id="value-input"
         name="value" onChange={handleFormChange} value={currency.value}/>
      </form>

      <h3>Converted Amount: {convertCurrency} {currency.target} </h3>
    </div>
  )
}
