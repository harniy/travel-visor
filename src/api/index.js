import axios from 'axios'

export const getPlacesData = async (type, sw, ne) => {

    try {
        const res = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': '5004efafb9msh4bc462359e588c3p145a3cjsn5a13394dc6ae'
          }
        })
        const data = await res.data.data
        
        return data
    } catch (error) {
        console.log(error)
    }
}