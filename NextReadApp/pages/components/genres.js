import React  from 'react';

export default function Genres() {

  let index = 0;
  const data = [
    {key:index++, label: ""},
    {key:index++, label: "Adventure"},
    {key:index++, label: "Children's stories"},
    {key:index++, label: "Horror"},
    {key:index++, label: "Fantasy"},
    {key:index++, label: "Fiction"},
    {key:index++, label: "Mystery"},
    {key:index++, label: "Romance"},
    {key:index++, label: "Young Adult Fiction"}
  ];

  return(
    data
  )
}
