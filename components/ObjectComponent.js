import React from 'react';
import {
    asset,
    VrButton,
    AmbientLight,
    PointLight
} from 'react-360';
import Entity from 'Entity';

export default class ObjectComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            val: 0,
            move: -70,
            caught: 0
        }
    }

    componentDidMount(){
        setInterval(()=>{
            if(this.state.val >= 360) this.setState({ val: 0 })
            if(this.state.move >= 0) this.setState({ move: -70 })
            this.setState({ 
                val: this.state.val + 1,
                move: this.state.move + this.props.speed
            })
        }, 10);
    }

    onClickScore = () => {
        this.setState({
            caught: 0
        })
        setTimeout(() => {
            this.setState({
                caught: 1
            }) 
        }, 5000)

        postMessage({ type: 'score', score: 1 });
    }

    render(){
        return(
            <VrButton 
                onClick={this.onClickScore}
                style={{
                    opacity: this.state.caught
                }}
            >
                <AmbientLight/>
                <PointLight/>
                <Entity
                    source={{
                        obj: asset('object/model.obj'),
                        mtl: asset('object/materials.mtl')
                    }}
                    style={{
                        transform: [
                            {
                                translate: [this.props.x ,0, this.state.move]
                            },
                            {
                                scale: 5
                            },
                            {
                                rotateY: this.state.val
                            }
                        ],
                        opacity: this.state.caught
                    }}
                />
            </VrButton>
        )
    }
}