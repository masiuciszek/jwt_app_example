import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav';

const Hello = require('./Hello.bs').make;
const Bye = require('./Bye.bs').make;

export default function index() {
  return (
    <div>
      <Hello />
      <Bye />
    </div>
  );
}
