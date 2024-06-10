import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config';
import { fetchSkillFilter, fetchSkillFilterNextPrev} from '../api/index';

const useSkillListCategoryHook = (initialCategory) => {
    const [category, setCategoryState] = useState(initialCategory);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPageURL, setNextPageURL] = useState(null);
    const [prevPageURL, setPrevPageURL] = useState(null);

    // Fetch data based on either the category change or pagination change
    const fetchSkills = useCallback((url = `${API_BASE_URL}/education_and_skills/skill_list_category/${category}/`) => {
        setLoading(true);
        fetchSkillFilterNextPrev(url)
        .then(response=>{

            setData(response.data.results);
            setNextPageURL(response.data.next);
            setPrevPageURL(response.data.previous);
            setLoading(false);

        }).catch(err => {

            setError(`Error fetching data: ${err.response ? err.response.data.message || err.message : err.message}`);
            setLoading(false);

        })
    }, [category]);

    // React to changes in category by resetting pagination and refetching data
    useEffect(() => {
        setNextPageURL(null);
        setPrevPageURL(null);
        fetchSkills();
    }, [category, fetchSkills]);

    const setCategory = (newCategory) => {
        if (newCategory !== category) {
            setCategoryState(newCategory);
        }
    };

    // Pagination handlers that utilize updated URLs
    const loadNextPage = () => nextPageURL && fetchSkills(nextPageURL);
    const loadPrevPage = () => prevPageURL && fetchSkills(prevPageURL);

    return { data, loading, error, loadNextPage, loadPrevPage, nextPageURL, prevPageURL, category, setCategory };
};

export default useSkillListCategoryHook;
