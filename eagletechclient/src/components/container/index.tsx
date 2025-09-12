import React from "react";
import { JSX } from "react/jsx-runtime";
import './container.css'
import Navbar from "../navbar";

interface Props {
    children: JSX.Element
}

const Container = (props: Props) => {
    return (
        <div className="row">
            <div className="col-3">
                <Navbar role={sessionStorage.getItem("role")!} />
            </div>
            <div className="col-9">
                <div className="w-100 bg d-flex flex-column align-items-center justify-content-center"
                    style={{
                        height: '100vh'
                    }}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Container