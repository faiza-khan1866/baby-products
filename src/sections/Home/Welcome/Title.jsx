import React from "react";
import {constants} from "../../../utils/constants";

function Title(props) {
    return (
        <div className="welcome-title">
            {/* <h1>{props.title}</h1> */}
            <h1>
                {
                    constants?.site_content?.SliderBottom.title[
                        props.language
                        ]
                }
                {/*Celebrate babies the way they are*/}
            </h1>
            <p
                // dangerouslySetInnerHTML={{
                //   __html: props.description,
                // }}
            >
                {
                    constants?.site_content?.SliderBottom.description[
                        props.language
                        ]
                }
                {/*Nurture the brilliance that each baby was born with*/}
            </p>
        </div>
    );
}

export default Title;
