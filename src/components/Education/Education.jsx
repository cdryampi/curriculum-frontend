import React from 'react';
import { SectionTitleIcon } from "../SectionTitles";
import UseListEducationHook from "../../hooks/UseEducationListHook"; // Assuming you have a similar hook for education
import { Oval } from 'react-loader-spinner';
import EducationCard from '../EducationCard/EducationCard';

const Education = () => {
    const { data: educationList, loading, error } = UseListEducationHook();

    if (error) {
        return <div>Error loading educational details.</div>;
    }

    return (
        <div className="educationWrap relative w-full">
            <SectionTitleIcon title="Education" />
            <div className="educationList grid grid-cols-1 md:grid-cols-1 gap-2 p-3">
                {loading ? (
                    <div className="flex justify-center items-center h-20">
                        <Oval
                            height={60}
                            width={60}
                            color="currentColor"
                            secondaryColor="currentColor"
                            strokeWidth={2}
                            ariaLabel="loading-education-data"
                            visible={true}
                            className="text-success"
                        />
                    </div>
                ) : (
                    educationList && educationList.map(education => (
                        <EducationCard education={education}/>
                    ))
                )}
            </div>
        </div>
    );
};

export default Education;
