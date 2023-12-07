const API_BASE_URL = 'http://127.0.0.1:5001'

function predict(data) {
  let dataset = {
    'First Term Gpa': data.First_Term_Gpa,
    'Second Term Gpa': data.Second_Term_Gpa,
    'First Language': data.First_Language,
    'Funding numeric': data.Funding,
    'School numeric': data.School,
    'FastTrack numeric': data.FastTrack,
    'Coop numeric': data.Coop,
    'Residency numeric': data.Residency,
    'Gender numeric': data.Gender,
    'Previous Education': data.Previous_Education,
    'Age Group': data.Age_Group,
    'High School Average Mark': data.High_School_Average_Mark,
    'Math Score': data.Math_Score,
    'English Grade': data.English_Grade,
  }

  dataset = Object.entries(dataset).reduce(
    (obj, [key, value]) => ((obj[key] = parseFloat(value)), obj),
    {}
  )

  return new Promise((resolve, reject) => {
    fetch(API_BASE_URL + '/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataset),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
        reject(false)
      })
  })
}

export { predict }
