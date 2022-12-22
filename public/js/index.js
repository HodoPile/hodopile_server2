const DELAY_INPUT = 1500
const UNSPLASH_ACCESS_KEY = "Vd8pXJDerwdrThr-HAsU9U8LHjAuWlFzi782_HYjlqU"
const UNSPLASH_BASE_URL = "https://api.unsplash.com"
const inputTextField = document.getElementById("inp-text")
const cardsContainer = document.getElementById("cards-container")
const favoritesContainer = document.getElementById("favorites-container")
const SERVER_URL = "https://hodopile-server.herokuapp.com"

const listOfTrashIcons = document.querySelectorAll(".icon-trash")
const listOfHeartIcons = document.querySelectorAll(".icon-heart")


const getFullCardInfo = async (card_id) => {
    const result = await fetch(`${UNSPLASH_BASE_URL}/photos/${card_id}/?client_id=${ UNSPLASH_ACCESS_KEY }`)
    const data = await result.json() 
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
            .then( res => res )
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
const debounce = (fn , delay) => {
        let id; 
        return (...args) => { 
            if(id) clearTimeout(id);
            id = setTimeout( () => fn(...args), delay );
        }
}
const handleInputChange = (e) => {
    let userInput = e.target.value
    userInput = (userInput)? userInput : 'Egypt'
    const doc = { userInput: userInput }
    fetch(`${SERVER_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( doc )
    })
    .then( response => location.reload() )
    .catch( err => console.log( err ) )
}

inputTextField.addEventListener( "input", debounce( handleInputChange, DELAY_INPUT ))

window.onload = () => {
    appendListenersToHeartIcons( listOfHeartIcons )
    appendListenersToTrashIcons( listOfTrashIcons )
};

