import React from 'react';
import useSkillListCategoryHook from '../../hooks/UseSkillListCategoryHook';
import { SkillCard } from '../SkillCard';
import { Oval } from 'react-loader-spinner';
import { SectionTitleIcon } from '../SectionTitles';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'; // Importando iconos
import { CATEGORIES_LIST } from '../../data/Skill/Skill';

const Skills = () => {
    const { data: skills, loading, error, loadNextPage, nextPageURL, loadPrevPage, prevPageURL, category, setCategory } = useSkillListCategoryHook('frontend');

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    return (
        <div className="skillsWrap relative w-full">
            <SectionTitleIcon title="Skills" />
            <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(CATEGORIES_LIST).map(([key, value]) => (
                    <button
                        key={key}
                        onClick={() => handleCategoryChange(value)}
                        className={`border-2 border-cyan-900 p-3 rounded-t-lg text-white font-Poppins font-bold transition duration-300 ease-in-out
                            ${category === value ? 'bg-accent text-white' : 'bg-desc2 text-white hover:bg-desc3'}`}
                    >
                        {value}
                    </button>
                ))}
            </div>
            {error && <div className="text-red-500">Error loading data: {error}</div>}
            {loading ? (
                <div className="flex justify-center items-center">
                    <Oval color="#00BFFF" height={80} width={80} />
                </div>
            ) : (
                <div className="skillsList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {skills.map(skill => (
                        <SkillCard key={skill.id} skill={skill} />
                    ))}
                </div>
            )}
            <div className="pagination flex justify-between mt-5">
                {prevPageURL && (
                    <button onClick={loadPrevPage} className="flex items-center justify-center bg-accent2 hover:bg-accent2_dark text-white py-2 px-4 rounded shadow">
                        <FiArrowLeft className="mr-2" /> Previous
                    </button>
                )}
                {nextPageURL && (
                    <button onClick={loadNextPage} className="flex items-center justify-center bg-accent2 hover:bg-accent2_dark text-white py-2 px-4 rounded shadow">
                        Next <FiArrowRight className="ml-2" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Skills;
