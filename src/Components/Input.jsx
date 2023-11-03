import React from "react";

function Input({ validation, content, id, type, placeholder, imgSrc, name, value, price, input, setInput}) {

    function handleChange(event) {
        const {name, value, checked} = event.target;
        
        if (name === "addOns") {
            
            if (checked) {
            setInput((prev) => {
                return {
                    ...prev,
                    [name]: [...prev[name], [value , price]]
                }
            })
          } else {
            setInput((prev => {
                const arr = prev[name].filter((item) => item[0] !== value);

                return {
                    ...prev,
                    [name]: arr
                }
            }))
          }

        } else if (name === "plan") {
            setInput((prev) => {
                return {
                    ...prev,
                    [name]: [value, price]
                }
            })
        } else {
        setInput((prev) => {
            return {...prev,
                 [name]: value
                }
        }) 
      }

        if (name === "subs") {
            setInput((prev) => {
                return {...prev,
                     subscription: prev.subs === "0" ? "Monthly" : "Yearly"
                    }
            })
        }
    }



    if (type === "radio") {
        return <>
        <input onChange={handleChange} type="radio" id={value} name={name} value={value} defaultChecked={input[name].includes(value) ? true : false} />
        <label className="radio-label" for={value}>
        
            <img src={imgSrc} alt="" /> 
            <div>
            <p className="heading">{value}</p>
            <p  className="price">{input.subscription === "Monthly" ? `$${price}/mo` : `$${price + "0"}/yr`}</p>
            
            {input.subscription === "Yearly" && <span className="free-text">2 months free</span>}
            </div>
        
        </label>
        </>

    } else if (type === "range") {

        return <input onChange={handleChange} className="input-range" type="range" min="0" max="1" name={name} value={input[name]} />
    
    } else if (type === "checkbox"){

       return <div className="checkbox-container">
        <input onChange={handleChange} id={id} type="checkbox" name={name}  value={value} defaultChecked={input[name].flat().includes(value) ? true : false} />
        <label for={id}>
        <div>
        <p className="check-heading">{content.heading}</p>
        <p className="check-text">{content.text}</p>
        </div>
        <span className="addon-price">{input.subscription === "Monthly" ? `+$${content.price}/mo`: `+$${content.price + "0"}/yr`}</span>
        </label>
       </div>

    } else {
        
    return <input onChange={handleChange} className={`input-text ${(!validation[name].missed || !validation[name].correctly) && "warn-focus"}`} type="text" name={name} placeholder={placeholder} value={input[name]} />
   }

}


export default Input;