
import { MongoClient } from 'mongodb';
import { Head } from 'next/head'
import { Fragment } from 'react';
import MeetupList from './../components/meetups/MeetupList';

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>All Meetups</title>
                <meta name="description" content="A List of meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment >
    )
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://athul:791VevNlGP1C1RL5@cluster0.uoem7.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: result.map(res => {
                return {
                    title: res.title,
                    image: res.image,
                    address: res.address,
                    description: res.description,
                    id: res._id.toString()
                }
            })
        },
        revalidate: 1
    }
}
export default HomePage;