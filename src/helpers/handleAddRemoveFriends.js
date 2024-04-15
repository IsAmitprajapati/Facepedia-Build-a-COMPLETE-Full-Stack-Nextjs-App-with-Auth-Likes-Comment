import axios from 'axios'

const handleAddRemoveFriends = async(friendId) =>{
    const payload = {
        friendId : friendId
    }
    const response = await axios.post('/api/add-remove-friends',payload)

    return response.data
}

export default handleAddRemoveFriends