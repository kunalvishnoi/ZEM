import React from "react";
import { BallBeat } from 'react-pure-loaders';

const HomeLoader = ({loading}) => (
<div className="d-flex align-items-center justify-content-center" style={{height: '100vh'}} >
	<BallBeat
          color={'#fff'}
          loading={loading}
        />
</div>
);

export default HomeLoader;
