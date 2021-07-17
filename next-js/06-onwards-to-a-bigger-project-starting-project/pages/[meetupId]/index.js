import { MongoClient, ObjectId } from "mongodb";
import MeetupDetails from "../../components/meetups/MeetupDetails"

const MeetupDetailsPage = (props) => {
    console.log(props)
    return (
        <MeetupDetails
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
            id={props.meetupData.id}
        />
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://athul:791VevNlGP1C1RL5@cluster0.uoem7.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.find({}, { _id: 1 }).toArray();

    client.close();
    const ids = result.map(res => {
        return {
            params: {
                meetupId: res._id.toString()
            }
        }
    })

    return {
        fallback: false,
        paths: ids
    }

}

export async function getStaticProps(context) {
    const meetupId = ObjectId(context.params.meetupId)
    const client = await MongoClient.connect('mongodb+srv://athul:791VevNlGP1C1RL5@cluster0.uoem7.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.findOne({ _id: meetupId }, {});

    return {
        props: {
            meetupData: {
                image: result.image,
                title: result.title,
                address: result.address,
                description: result.description,
                id: meetupId.toString()
            }
        },
        revalidate: 1
    }
}

export default MeetupDetailsPage;