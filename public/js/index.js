const DELAY_INPUT = 1500
const UNSPLASH_ACCESS_KEY = "Vd8pXJDerwdrThr-HAsU9U8LHjAuWlFzi782_HYjlqU"
const UNSPLASH_BASE_URL = "https://api.unsplash.com"
const inputTextField = document.getElementById("inp-text")
const cardsContainer = document.getElementById("cards-container")
const favoritesContainer = document.getElementById("favorites-container")
const SERVER_URL = "http://localhost:3000"



const listOfTrashIcons = document.querySelectorAll(".icon-trash")
const listOfHeartIcons = document.querySelectorAll(".icon-heart")


const getFullCardInfo = async (card_id) => {
    const result = await fetch(`${UNSPLASH_BASE_URL}/photos/${card_id}/?client_id=${ UNSPLASH_ACCESS_KEY }`)
    const data = await result.json()  // gets location information (lat/lon, tags, similar collections, etc)
    return data
}

const appendListenersToHeartIcons = ( heartIconsList ) => {
     heartIconsList.forEach( iconImageElement => {
        iconImageElement.addEventListener("click", async ( e ) => {
    
            const id = e.currentTarget.parentNode.id
            const [, card_id ] = id.split(":")

            const fetch_result = await getFullCardInfo( card_id )
            let { alt_description, description, tags, urls:{small: img_url} } = fetch_result
            let selected_tags = tags.filter( tag => tag.type == "search" )
            let temp1 = { alt_description, description, selected_tags, img_url }
            let card_data = {}
            for( let prop in temp1 ){
                if( temp1[prop] && temp1[prop].length ) {
                    card_data[prop] = temp1[prop]
                }
            }
            const CARD_DATA = { card_id, ...card_data}
            fetch(`${SERVER_URL}/user/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( CARD_DATA )
            })
            .then( res => {
                console.log(res)
                return res
            })
            .then( () => location.reload() )
            .catch( err => console.log( err ) )
        })
    })
}

const appendListenersToTrashIcons = ( trashIconsList ) => {

    trashIconsList.forEach( iconImageElement => {
        iconImageElement.addEventListener("click", async ( e ) => {
    
            const id = e.currentTarget.parentNode.id
            const [ , card_id ] = id.split(":")
            
            console.log( card_id )
            fetch(`${SERVER_URL}/user/${card_id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            .then( res => res )
            .then( () => location.reload() )
            .catch( err => console.log( err ) )

        })
    })

}






// CB's
const debounce = (fn , delay) => {
    // PROBLEM: need to debounce fn calls because listener will listen to every character inputed by user
    // DONE implement debounce
        let id; 
        // console.log(`input ${id}`) // at load
        return (...args) => { 
            // console.log(`prev id: ${id}`)
            if(id) clearTimeout(id);
            id = setTimeout( () => {
                fn(...args)
            }, delay);
        }
}
const handleInputChange = (e) => {
    const userInput = e.target.value
    if( userInput ) getUnsplashImgURL( userInput )
}
const handleCardClick = async (e) => {
    const id_attribute = e.target.parentNode.id
    const [ , id ] = id_attribute.split(":")
    const card_data = await getFullCardInfo( id )
    return card_data
}


// SERVER CALLS
const updateOneUser = async ( data ) => {
    // update users favorites cards array - add new favorited location
    const SERVER = "http://localhost:3000/user"
    const OPTIONS = {
        method: "PUT",
        body: JSON.stringify( data ),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
    const result = await fetch(SERVER,OPTIONS)
    const msg = await result.json() // ackhowledge: true if successful
}
const updateOneCard = async ( data ) => {
    // const result = await fetch("")
    const SERVER = "http://localhost:3000/favorites"
    const OPTIONS = {
        method: "PUT",
        body: JSON.stringify( data ),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
    const result = await fetch(SERVER,OPTIONS)
    const msg = await result.json() // ackhowledge: true if successful
}


// API CALLS
// const getUnsplashImgURL = ( query ) => {
//     fetch(`${ UNSPLASH_BASE_URL }/search/photos?client_id=${ UNSPLASH_ACCESS_KEY }&page=1&per_page=10&query=${ query }}`)
//         .then( response => response.json())
//         .then( ({ results }) => {
//             // console.log(results)
//             renderUnsplashResults( results )
//         })
//         .catch( err => console.log( err ) )
// }
// const getFullCardInfo = async (card_id) => {
//     const result = await fetch(`${UNSPLASH_BASE_URL}/photos/${card_id}/?client_id=${ UNSPLASH_ACCESS_KEY }`)
//     const data = await result.json()  // gets location information (lat/lon, tags, similar collections, etc)
//     return data
// }

// UI
// const renderUnsplashResults = ( list ) => {   
//     if( cardsContainer.childNodes ){
//         while( cardsContainer.firstChild ){
//             cardsContainer.removeChild( cardsContainer.lastChild )
//         }
//     }
//     list.forEach( destinationObj => createCardElement( destinationObj, cardsContainer ))
//     const heartIcons = document.querySelectorAll(".icon-heart")
//     heartIcons.forEach( icon => {
//         icon.addEventListener("click", handleHeartClick)
//     })

// }
// const createCardElement = ( destinationObj, containerElement ) => {
//     let {
//         urls: {small}, 
//         alt_description,
//         description, 
//         user: { first_name, last_name },
//         tags,
//         id
//     } = destinationObj
//     const { title } = tags[0]
//     const card = document.createElement("div")
//     card.setAttribute("id",`cardID:${id}`)
//     card.setAttribute("class","card target bg-base-100 shadow-xl flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4")
//     card.innerHTML = `
//         <div id=id:${id}>
//                 <h2 class="card-title">${title}</h2>
//                     <img src="${small}" alt="${alt_description}" />
//                     <div id=id:${id} class="card-actions justify-end">
//                         <p class="card-description">${description}</p>
//                         <p class="credit">Photo by ${first_name} ${last_name} on Unsplash</p>
//                         <img id=id:${id} class="icon-heart" src="./imgs/heart_icon.png" alt="heart icon">
//                     </div>
//             </div>
//         </div>
//     `

//     card.addEventListener( "click", handleCardClick )
//     containerElement.appendChild( card )
// }

// inputTextField.addEventListener( "input", debounce( handleInputChange, DELAY_INPUT ))
window.onload = () => {
    appendListenersToHeartIcons( listOfHeartIcons )
    appendListenersToTrashIcons( listOfTrashIcons )
    // getUnsplashImgURL('africa')
    // get users favorited
    // 
};