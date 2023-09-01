import { useParams } from "react-router-dom";

function OtherProfile(){

    const {username} = useParams()

    console.log(username)
return(
    null
)

}

export default OtherProfile