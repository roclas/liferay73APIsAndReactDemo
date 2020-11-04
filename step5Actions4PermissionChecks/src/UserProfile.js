import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';

const userProfileQuery = gql`query documents($filter: String){
  documents(siteKey: "Guest", filter: $filter) {
    items {
      creator {
        id
        name
      }
      contentUrl
      title
    }
  }
}`

export default () => {

  console.log("userProfileQuery",userProfileQuery);

  const {creatorId} = useParams();

  console.log("creatorId",creatorId);

  const {loading, data} = useQuery(userProfileQuery, {
    variables: {
      filter: `creatorId eq ${creatorId}`
    }
  });

  console.log("data",data)

  return (
    <div className="video">{
      data && data.documents && data.documents.items.map(document => (
        <video key={document.contentUrl} style={{width:"33%"}}
          src={'http://localhost:8080/' + document.contentUrl}
        />
      ))
    }</div>
  )
}
