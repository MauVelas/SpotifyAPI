import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import Colection from './Colection' 

      //const vocales = ["'", " ", "$"];
      //const stronger = toString(vocales)
      //console.log(stronger)
      /*function lettersOnly(pruebaf) {
        const regex = /[^a-z]/gi;
        var pruebaf = input.value
        pruebaf = pruebaf.replace(regex, "");
      } */

const Todo = () => {
    const urlBase = 'https://api.spotify.com/v1'
    const [newRelases, setnewRelases] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [stringToSearch, setStringToSearch] = useState("")
    const clickB = async() => {
        setnewRelases(null)
        const newRelases = await buscarAlbumsAPI();
        setnewRelases(newRelases)
        setStringToSearch('')
    }
    const buscarAlbumsAPI= async() => {
        console.log(stringToSearch)

        //if(stringToSearch===''){
          //alert("Prueba")
          //stringToSearch = null; 
          //buscarAlbumsAPI();
        //}
        

        try {
            let url = 'https://api.spotify.com/v1/search';
            const res = await axios.get(
              url, {
                params: {
                    q:stringToSearch,
                    type:'album'
                },
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
            })
            
            if(res.status===200){
              console.log("----------------------")
              console.log(res)
              console.log("res--------------")
              return res.data
            }else{
              return 'Ocurrio un error al obtener la info'
            }
          }catch (error) {
            console.log(error);
            return 'Ocurrio un error1234 al obtener la info'
          }
        
        

        }
    
    useEffect(() => {
          //ingresar su clientID
      const clientId = "xxxxd52004784de78d1427080a2ab87d"
          //ingresar su clientSecretID
      const clientSecret = "xxxb715b0b7c4e14b1843e6e4e9e015a";
      const redirectUri = 'http://localhost:5173/'
      const code = "AQC1dyL6uPxJMPW0r7xhMiNx5AS48wbroyUbUYRYfGCGIvuEd8gxvUQenBkmRsYNSjZW5hT7qHEQ54aPbvJsVQSKgUORXWv3783K2CK_bLrm9qZUufpOsjSN8DGQDsqw_Zn44vIvBx3MTMbneJaJTV3sno0I8UyPYIQ"
      const load_initial_page = async () => {
        const access = await getAccessToken();
        setAccessToken(access)
        const newRelases = await get_new_relases(access);
        setnewRelases(newRelases)
      }
      const getAccessToken = async () => {
        const data = {
          code: code,
          redirect_uri: redirectUri,
          grant_type: 'client_credentials'
        }
          try {
            let url = "https://accounts.spotify.com/api/token";
            const res = await axios.post(url, data, {
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
              },
            });
            if (res.status == 200) {
              return res.data.access_token;
            } else {
              return 'No fue posible obtener el access token';
            }
          } catch (error) {
            return 'No fue posible obtener el access token';   
          }
        };
      const get_new_relases = async (accessToken) => {
        try {
          let url = `${urlBase}/browse/new-releases`;
          const res = await axios.get(
            url, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
          })
          
          if(res.status===200){
            console.log(res)
            return res.data
          }else{
            return 'Ocurrio un error al obtener la info'
          }
        }catch (error) {
          console.log(error);
          return 'Ocurrio un error al obtener la info'
        }
      }
      
        load_initial_page()
    }, []);
      if(newRelases === null){
        return (
          <>
            <input 
                type="text" 
                value={stringToSearch}
                onChange={e => setStringToSearch(e.target.value)}
            />
            <button onClick={clickB}>Buscar</button>
            <div>
              Cargando ...
            </div>
          </>
        )
      }
      else if(typeof newRelases === "string"){
        return (
          <>
            <div>
              Error: {newRelases}
            </div>
          </>
        )
      }
      else{
        //console.log('pññññññññññññññññññññññññññññññ')
        //console.log(accessToken)
        console.log(newRelases)
        //console.log('pññññññññññññññññññññññññññññññ')
        return (
          <>
            <div className='searchBar'>
                <input className='searchInput'
                    type="text" 
                    value={stringToSearch}
                    onChange={e => setStringToSearch(e.target.value)}
                    placeholder='Álbum o nombre de artista'
                    //onKeyUp = {lettersOnly(this)} 
                />
                <button className='searchButton' onClick={clickB}>Buscar</button>
            </div>
            <Colection albums={newRelases.albums.items} accessToken={accessToken}/>
          </>
        )
      }
}

export default Todo
