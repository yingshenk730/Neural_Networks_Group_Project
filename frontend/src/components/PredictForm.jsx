import { useState } from 'react'
import { predict } from '../api'

const PredictForm = () => {
  const [features, setFeatures] = useState({
    First_Term_Gpa: '',
    Second_Term_Gpa: '',
    First_Language: '',
    Funding: '',
    School: '',
    FastTrack: '',
    Coop: '',
    Residency: '',
    Gender: '',
    Previous_Education: '',
    Age_Group: '',
    High_School_Average_Mark: '',
    Math_Score: '',
    English_Grade: '',
  })

  const [warning, setWarning] = useState({
    First_Term_Gpa: '',
    Second_Term_Gpa: '',
    Math_Score: '',
    High_School_Average_Mark: '',
  })

  const [predictedResult, setPredictedResult] = useState(null)

  const handleFirstGPAChange = (e) => {
    const gpa = e.target.value
    if (gpa >= 0 && gpa <= 4.5) {
      // clear the warning and update the state
      setWarning({ ...warning, First_Term_Gpa: '' })
      setFeatures({ ...features, First_Term_Gpa: gpa })
    } else {
      setWarning({ ...warning, First_Term_Gpa: 'GPA value should be 0~4.5' })
    }
  }

  const handleSecondGPAChange = (e) => {
    const gpa = e.target.value
    if (gpa >= 0 && gpa <= 4.5) {
      // clear the warning and update the state
      setWarning({ ...warning, Second_Term_Gpa: '' })
      setFeatures({ ...features, Second_Term_Gpa: gpa })
    } else {
      setWarning({ ...warning, Second_Term_Gpa: 'GPA value should be 0~4.5' })
    }
  }
  const handleMathScoreChange = (e) => {
    const score = e.target.value
    if (score >= 0 && score <= 50) {
      // clear the warning and update the state
      setWarning({ ...warning, Math_Score: '' })
      setFeatures({ ...features, Math_Score: score })
    } else {
      setWarning({ ...warning, Math_Score: 'Score value should be 0~50.0' })
    }
  }

  const handleHighSchoolMarkChange = (e) => {
    const mark = e.target.value
    if (mark >= 0 && mark <= 100) {
      // clear the warning and update the state
      setWarning({ ...warning, High_School_Average_Mark: '' })
      setFeatures({ ...features, High_School_Average_Mark: mark })
    } else {
      setWarning({
        ...warning,
        High_School_Average_Mark: 'Mark value should be 0~100.0',
      })
    }
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const predicted = await predict(features)
    setPredictedResult(predicted.prediction[0][0])
  }

  const handleReset = () => {
    setFeatures({
      First_Term_Gpa: '',
      Second_Term_Gpa: '',
      First_Language: '',
      Funding: '',
      School: '',
      FastTrack: '',
      Coop: '',
      Residency: '',
      Gender: '',
      Previous_Education: '',
      Age_Group: '',
      High_School_Average_Mark: '',
      Math_Score: '',
      English_Grade: '',
    })
    setPredictedResult(null)
  }

  return (
    <div className=" w-screen">
      <h1 className="flex items-center justify-center mt-6 text-4xl font-bold bg-sky-800 m-6 h-20 text-white rounded-xl shadow-xl">
        First Year Persistence Prediction
      </h1>
      <div className=" bg-slate-100 m-6 rounded-xl p-6 pb-0 shadow-lg">
        <h1 className=" font-bold text-2xl text-center p-3">
          Feature Input Form
        </h1>
        <form className="  p-2 ">
          <div className="flex flex-row p-4">
            <div className="flex flex-row flex-1 gap-2">
              <label className="w-32">First Term Gpa</label>
              <input
                className="w-40 pl-2"
                type="number"
                step={0.1}
                placeholder="First Term Gpa"
                value={features.First_Term_Gpa}
                onChange={handleFirstGPAChange}
                onKeyDown={handleEnterPress}
              />
              {warning.First_Term_Gpa && (
                <p className="text-red-500">{warning.First_Term_Gpa}</p>
              )}
            </div>

            <div className="flex flex-row gap-2 flex-1">
              <label className="w-40">Second Term Gpa</label>
              <input
                type="number"
                className="w-44 pl-2"
                step={0.1}
                placeholder="Second Term Gpa"
                value={features.Second_Term_Gpa}
                onChange={handleSecondGPAChange}
                onKeyDown={handleEnterPress}
              />
              {warning.Second_Term_Gpa && (
                <p className="text-red-500">{warning.Second_Term_Gpa}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row p-4">
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-32 ">First launguage</label>
              <select
                className="w-40 pl-2"
                value={features.First_Language}
                onChange={(e) => {
                  setFeatures({ ...features, First_Language: e.target.value })
                }}>
                <option value="" disabled hidden>
                  Please select first language
                </option>
                <option value="1">English</option>
                <option value="2">French</option>
                <option value="3">Other</option>
              </select>
            </div>
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-40">Funding</label>
              <select
                className="w-44 pl-2"
                value={features.Funding}
                onChange={(e) => {
                  setFeatures({ ...features, Funding: e.target.value })
                }}>
                <option value="" disabled hidden>
                  Please select funding
                </option>
                <option value="1">Apprentice_PS</option>
                <option value="2">GPOG_FT</option>
                <option value="3">Intl Offshore</option>
                <option value="4">Intl Regular</option>
                <option value="5">Intl Transfer</option>
                <option value="6">Joint Program Ryerson</option>
                <option value="7">Joint Program UTSC</option>
                <option value="8">Second Career Program</option>
                <option value="9">Work Safety Insurance Board</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row p-4">
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-32">School</label>
              <select
                className="w-40 pl-2"
                value={features.School}
                onChange={(e) => {
                  setFeatures({ ...features, School: e.target.value })
                }}>
                <option value="" disabled hidden>
                  Please select School
                </option>
                <option value="1">Advancement</option>
                <option value="2">Business</option>
                <option value="3">Communications</option>
                <option value="4">Community and Health</option>
                <option value="5">Hospitality</option>
                <option value="6">Engineering</option>
                <option value="7">Transportation</option>
              </select>
            </div>
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-40">Fast Track</label>
              <select
                className="w-44 pl-2"
                value={features.FastTrack}
                onChange={(e) => {
                  setFeatures({ ...features, FastTrack: e.target.value })
                }}>
                <option value="" disabled hidden>
                  Please select
                </option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row p-4">
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-32">Coop</label>
              <select
                className="w-40 pl-2"
                value={features.Coop}
                onChange={(e) => {
                  setFeatures({ ...features, Coop: e.target.value })
                }}>
                <option value="" disabled hidden>
                  Please select
                </option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
            </div>
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-40">Residency</label>
              <select
                className="w-44 pl-2"
                value={features.Residency}
                onChange={(e) => {
                  setFeatures({ ...features, Residency: e.target.value })
                }}>
                <option value="" disabled hidden>
                  Please select residency
                </option>
                <option value="1">Domestic</option>
                <option value="2">International</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row p-4">
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-32">Gender</label>
              <select
                className="w-40 pl-2"
                value={features.Gender}
                onChange={(e) => {
                  setFeatures({ ...features, Gender: e.target.value })
                }}>
                <option value="" disabled hidden>
                  Please select gender
                </option>
                <option value="1">Female</option>
                <option value="2">Male</option>
                <option value="3">Netural</option>
              </select>
            </div>
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-40">Previous Education</label>
              <select
                className="w-44 pl-2"
                value={features.Previous_Education}
                onChange={(e) => {
                  setFeatures({
                    ...features,
                    Previous_Education: e.target.value,
                  })
                }}>
                <option value="" disabled hidden>
                  Please select previous education
                </option>
                <option value="1">HighSchool</option>
                <option value="2">PostSecondary</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row p-4">
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-32">Age Group</label>
              <select
                className="w-40 pl-2"
                value={features.Age_Group}
                onChange={(e) => {
                  setFeatures({ ...features, Age_Group: e.target.value })
                }}>
                <option value="" disabled hidden>
                  Please elect Age Group
                </option>
                <option value="1">0 to 18</option>
                <option value="2">19 to 20</option>
                <option value="3">21 to 25</option>
                <option value="4">26 to 30</option>
                <option value="5">31 to 35</option>
                <option value="6">36 to 40</option>
                <option value="7">41 to 50</option>
                <option value="8">51 to 60</option>
                <option value="9">61 to 65</option>
                <option value="10">66+</option>
              </select>
            </div>
            <div className="flex flex-row gap-2 flex-1">
              <label className=" w-52">High School Average Mark</label>
              <input
                type="number"
                step={0.1}
                placeholder="Enter mark here"
                value={features.High_School_Average_Mark}
                className="w-32 pl-2"
                onChange={handleHighSchoolMarkChange}
                onKeyDown={handleEnterPress}
              />
              {warning.High_School_Average_Mark && (
                <p className="text-red-500">
                  {warning.High_School_Average_Mark}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row p-4">
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-32">Math Score</label>
              <input
                type="number"
                step={0.1}
                placeholder="Enter score here"
                value={features.Math_Score}
                className="w-40 pl-2"
                onChange={handleMathScoreChange}
                onKeyDown={handleEnterPress}
              />
              {warning.Math_Score && (
                <p className="text-red-500">{warning.Math_Score}</p>
              )}
            </div>
            <div className="flex flex-row gap-2 flex-1">
              <label className="w-40">English Grade</label>
              <select
                className="w-44 pl-2"
                value={features.English_Grade}
                onChange={(e) => {
                  setFeatures({ ...features, English_Grade: e.target.value })
                }}>
                <option value="" disabled hidden>
                  Please Select English Grade
                </option>
                <option value="1">Level-130</option>
                <option value="2">Level-131</option>
                <option value="3">Level-140</option>
                <option value="4">Level-141</option>
                <option value="5">Level-150</option>
                <option value="6">Level-151</option>
                <option value="7">Level-160</option>
                <option value="8">Level-161</option>
                <option value="9">Level-170</option>
                <option value="10">Level-171</option>
                <option value="11">Level-180</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center m-3 gap-6">
            <button
              className="w-40 h-12 bg-sky-800 text-lg font-semibold shadow-lg text-white  rounded-lg cursor-pointer"
              onClick={handleSubmit}>
              Predict
            </button>
            <button
              className="w-40 h-12 bg-sky-800 text-lg font-semibold shadow-lg text-white  rounded-lg cursor-pointer"
              onClick={handleReset}>
              Reset
            </button>
          </div>
          {predictedResult && (
            <div className="flex flex-row items-center justify-center m-3 gap-2">
              <p className="text-2xl font-bold ">Your Prediction Result: </p>
              <p
                className={`text-3xl font-bold ${
                  predictedResult > 0.5 ? 'text-blue-900' : 'text-red-700'
                }`}>
                {predictedResult > 0.5 ? 'Persist' : 'Dropout'}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default PredictForm
