import NewMeetupForm from './../../components/meetups/NewMeetupForm';

const NewMeetUp = () => {
    const meetUpAddHandler = async (meetUpData) => {
        console.log(meetUpData)
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetUpData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response)
    }
    return (
        <NewMeetupForm onAddMeetup={meetUpAddHandler} />
    )
}

export default NewMeetUp;