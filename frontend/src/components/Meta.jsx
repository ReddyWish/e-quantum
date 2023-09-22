import React from 'react';
import { Helmet } from 'react-helmet-async';

function Meta({ title, description, keywords }) {

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}/>
      <meta name='keywords' content={keywords}/>
    </Helmet>
  );
}

Meta.defaultProps = {
  title: 'Welcome to Quantum Electronics',
  description: 'Here you can find best drones from all brands cheaper then anywhere',
  keywords: 'electronics, drones, buy drone, cheap electronics'
}

export default Meta;