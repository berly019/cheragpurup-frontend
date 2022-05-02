import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

export const DataContext = createContext();

const DataContextProvider = (props) => {
    // const [rerender, setRerender] = useState(false);

    const [commerces, setCommerces] = useState([]);
    const [cFilteredData, setCFilteredData] = useState([]);

    const [treadLicenses, setTreadLicenses] = useState([]);
    const [tFilteredData, setTFilteredData] = useState([]);

    const [cCharacters, setCCharacters] = useState([]);
    const [chFilteredData, setChCharacterData] = useState([]);

    const [cNagoriks, setCNagoriks] = useState([]);
    const [cNFilteredData, setCNFilteredData] = useState([]);

    const [cOwarishs, setCOwarishs] = useState([]);
    const [cOFilteredData, setCOFilteredData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const rWord = JSON.parse(localStorage.getItem("rWord"));
    const rPageNo = JSON.parse(localStorage.getItem("rPage"));
    const [pageROffset, setPageROffset] = useState(Number(rPageNo) ? Number(rPageNo) : 0);
    const [pageRNumber, setPageRNumber] = useState(Number(rPageNo) ? Number(rPageNo) : 0);


    const cWord = JSON.parse(localStorage.getItem("cWord"));
    const cPageNo = JSON.parse(localStorage.getItem("cPage"));
    const [pageOffset, setPageOffset] = useState(Number(cPageNo) ? Number(cPageNo) : 0);
    const [pageNumber, setPageNumber] = useState(Number(cPageNo) ? Number(cPageNo) : 0);






    /* total data from db home */
    const [totalData, setTotalData] = useState([])
    const [homeData, setHomeData] = useState([]);
    const [dLoading, setDLoading] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/`)
            .then(res => {
                // console.log(res);
                setDLoading(true);
            })

        axios.get(`${process.env.REACT_APP_BASE_URL}/up/db_home`)
            .then(data => {
                setHomeData(data?.data);
                setIsLoading(true);
            });

        axios.get(`${process.env.REACT_APP_BASE_URL}/up/db_home/6249ebaa4c1ff21f2a664fa2`)
            .then(data => {
                setTotalData(data?.data);
            });
    }, []);


    /* update data */
    const updateDataTable = (id, updatedDataTable) => {
        setHomeData(homeData?.map((Commerce) => Commerce._id === id ? updatedDataTable : Commerce))
    }





    /* -----------------------------------Resident Start-------------------------------- */

    const [residents, setResidents] = useState([]);
    const [rFilteredData, setRFilteredData] = useState([]);

    // initial data
    useEffect(() => {
        localStorage.setItem("rPage", JSON.stringify(pageRNumber));
        if (rWord === "all") {
            axios.get(`${process.env.REACT_APP_BASE_URL}/up/resident`)
                .then(data => {
                    setResidents(data.data);
                    setRFilteredData(data.data);
                    setIsLoading(true);
                })
        } else {
            axios.get(`${process.env.REACT_APP_BASE_URL}/up/resident/word/${rWord ? rWord : 1}`)
                .then(data => {
                    setResidents(data.data);
                    setRFilteredData(data.data)
                    setIsLoading(true);
                });
        }
        setPageROffset(Number(rPageNo) ? Number(rPageNo) : 0);
    }, [rWord, pageRNumber, rPageNo]);

    // filter
    const handleRWordFilter = id => {
        localStorage.setItem("rWord", JSON.stringify(id));

        axios.get(`${process.env.REACT_APP_BASE_URL}/up/commerce/word/${id}`)
            .then(data => {
                // setFilteredData(data.data)
                setCFilteredData(data.data)
            });
        setPageRNumber(0);
        setPageROffset(0);
    }
    const handleRAllFilter = () => {
        localStorage.setItem("rWord", JSON.stringify("all"));

        axios.get(`${process.env.REACT_APP_BASE_URL}/up/resident`)
            .then(data => {
                // setFilteredData(data.data);
                setCFilteredData(data.data);
            })
        setPageRNumber(0);
        setPageROffset(0);
    };

    const residentData = residents?.sort((a, b) => (a.name < b.name ? -1 : 1));

    const addResident = (holding_no, payer_name, guardian_name, word_no, village, previes_areas_tax, assign_tax, collected_tax, mobile_no, total_tax, areas_tax) => {
        // setCommerces([...commerces, { holdingNo, payerName, guardianName, businessOrg, wordNo, village, pAreasTax, assignTax, collectedTax, mobileNo, totalTax, areasTax }]);
        const newData = ([...residents, { holding_no, payer_name, guardian_name, word_no, village, previes_areas_tax, assign_tax, collected_tax, mobile_no, total_tax, areas_tax }]);

        setResidents(newData);
        setRFilteredData(newData);
    }

    /* update data */
    const updateResident = (id, updatedCommerce) => {
        setResidents(residents?.map((Resident) => Resident._id === id ? updatedCommerce : Resident))
    }

    /* -----------------------------------Resident Start-------------------------------- */
    /* -----------------------------------Commerce Start --------------------------------*/

    // initial data
    useEffect(() => {
        localStorage.setItem("cPage", JSON.stringify(pageNumber));
        if (cWord === "all") {
            axios.get(`${process.env.REACT_APP_BASE_URL}/up/commerce`)
                .then(data => {
                    setCommerces(data.data);
                    setCFilteredData(data.data);
                    setIsLoading(true);
                })
        } else {
            axios.get(`${process.env.REACT_APP_BASE_URL}/up/commerce/word/${cWord ? cWord : 1}`)
                .then(data => {
                    setCommerces(data.data);
                    setCFilteredData(data.data)
                    setIsLoading(true);
                });
        }
        setPageOffset(Number(cPageNo) ? Number(cPageNo) : 0);
    }, [cWord, pageNumber, cPageNo]);

    // filter
    const handleCWordFilter = id => {
        localStorage.setItem("cWord", JSON.stringify(id));

        axios.get(`${process.env.REACT_APP_BASE_URL}/up/commerce/word/${id}`)
            .then(data => {
                // setFilteredData(data.data)
                setCFilteredData(data.data)
            });
        setPageNumber(0);
        setPageOffset(0);
    }
    const handleCAllFilter = () => {
        localStorage.setItem("cWord", JSON.stringify("all"));

        axios.get(`${process.env.REACT_APP_BASE_URL}/up/commerce`)
            .then((data) => {
                setCFilteredData(data.data);
            })

        setPageNumber(0);
        setPageOffset(0);
    };

    const commerceData = commerces?.sort((a, b) => (a.name < b.name ? -1 : 1));

    const addCommerce = (holding_no, payer_name, guardian_name, business_org, word_no, village, previes_areas_tax, assign_tax, collected_tax, mobile_no, total_tax, areas_tax) => {
        // setCommerces([...commerces, { holdingNo, payerName, guardianName, businessOrg, wordNo, village, pAreasTax, assignTax, collectedTax, mobileNo, totalTax, areasTax }]);
        const newData = ([...commerces, { holding_no, payer_name, guardian_name, business_org, word_no, village, previes_areas_tax, assign_tax, collected_tax, mobile_no, total_tax, areas_tax }]);

        setCommerces(newData);
        setCFilteredData(newData);
    }

    /* update data */
    const updateCommerce = (id, updatedCommerce) => {
        setCommerces(commerces?.map((Commerce) => Commerce._id === id ? updatedCommerce : Commerce))
    }

    /* ------------------------------Commerce End --------------------------------*/
    /* ------------------------------Treadlicense End ----------------------------*/

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/tread_license`)
            .then(data => {
                setTreadLicenses(data.data);
                setTFilteredData(data.data);
                setIsLoading(true);
            })
    }, []);

    const treadLicenseData = treadLicenses?.sort((a, b) => (a.name < b.name ? -1 : 1));

    const addTreadLicense = (license_no, institute_address, institute_name, profession_capital, owner_name, license_fee, guardian_name, arrears, mothers_name, total, address, in_words, business_type, mobile_no) => {
        const newData = ([...treadLicenses, { license_no, institute_address, institute_name, profession_capital, owner_name, license_fee, guardian_name, arrears, mothers_name, total, address, in_words, business_type, mobile_no }]);

        setTreadLicenses(newData);
        setTFilteredData(newData);
    }

    /* update data */
    const updateTreadLicense = (id, updatedTL) => {
        setTreadLicenses(treadLicenses?.map((TreadLicense) => TreadLicense._id === id ? updatedTL : TreadLicense))
    }

    /* ------------------------------Treadlicense End --------------------------------*/
    /* ------------------------------CCharacter End ----------------------------------*/

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/character_certificate`)
            .then(data => {
                setCCharacters(data.data);
                setChCharacterData(data.data);
                setIsLoading(true);
            })
    }, []);

    const cCharacterData = cCharacters?.sort((a, b) => (a.name < b.name ? -1 : 1));

    const addCCharacter = (memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status) => {
        const newData = ([...cCharacters, { memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status }]);

        setCCharacters(newData);
        setChCharacterData(newData);
    }

    /* update data */
    const updateCCharacter = (id, updatedTL) => {
        setCCharacters(cCharacters?.map((TreadLicense) => TreadLicense._id === id ? updatedTL : TreadLicense))
    }

    /* ------------------------------CCharacter End --------------------------------*/
    /* ------------------------------CNagorik End --------------------------------*/

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/citizen_certificate`)
            .then(data => {
                setCNagoriks(data.data);
                setCNFilteredData(data.data);
                setIsLoading(true);
            })
    }, []);

    const cNagorikData = cNagoriks?.sort((a, b) => (a.name < b.name ? -1 : 1));

    const addCNagorik = (memorandum_no, nId_no, holding_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status) => {
        const newData = ([...cNagoriks, { memorandum_no, nId_no, holding_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status }]);

        setCNagoriks(newData);
        setCNFilteredData(newData);
    }

    /* update data */
    const updateCNagorik = (id, updatedCN) => {
        setCNagoriks(cNagoriks?.map((TreadLicense) => TreadLicense._id === id ? updatedCN : TreadLicense))
    }

    /* ------------------------------CNagorik End --------------------------------*/
    /* ------------------------------COwarish End --------------------------------*/

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/inheritance_certificate`)
            .then(data => {
                setCOwarishs(data.data);
                setCOFilteredData(data.data);
                setIsLoading(true);
            })
    }, []);

    const cOwarishData = cOwarishs?.sort((a, b) => (a.name < b.name ? -1 : 1));

    const addCOwarish = (memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status, name1, relation1, name2, relation2, name3, relation3, name4, relation4, name5, relation5, name6, relation6, name7, relation7, name8, relation8, name9, relation9, name10, relation10, name11, relation11, name12, relation12, name13, relation13, name14, relation14, name15, relation15) => {
        const newData = ([...cOwarishs, { memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status, name1, relation1, name2, relation2, name3, relation3, name4, relation4, name5, relation5, name6, relation6, name7, relation7, name8, relation8, name9, relation9, name10, relation10, name11, relation11, name12, relation12, name13, relation13, name14, relation14, name15, relation15 }]);

        setCOwarishs(newData);
        setCOFilteredData(newData);
    }

    /* update data */
    const updateCOwarish = (id, updatedCO) => {
        setCOwarishs(cOwarishs?.map((Data) => Data._id === id ? updatedCO : Data))
    }

    /* ------------------------------COwarish End --------------------------------*/
    /* ------------------------------WMember Start -------------------------------*/

    const [wMember, setWMember] = useState([]);
    const [wMFilteredData, setWMFilteredData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/wmember`)
            .then(data => {
                setWMember(data.data);
                setWMFilteredData(data.data);
                setIsLoading(true);
            })
    }, []);

    const wMemberData = wMember;

    const addWMember = (desi, name, phone, email, doj, image) => {
        const newData = ([...wMember, { desi, name, phone, email, doj, image }]);

        setWMember(newData);
        setWMFilteredData(newData);
    }

    /* update data */
    const updateWMember = (id, updatedWM) => {
        setWMember(wMember?.map((Data) => Data._id === id ? updatedWM : Data))
    }

    /* ------------------------------WMember End ---------------------------------*/
    /* ------------------------------WEntrepreneur Start -------------------------*/

    const [wEntrepreneur, setWEntrepreneur] = useState([]);
    const [wEFilteredData, setWEFilteredData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/entrepreneur`)
            .then(data => {
                setWEntrepreneur(data.data);
                setWEFilteredData(data.data);
                setIsLoading(true);
            })
    }, []);

    const wEntrepreneurData = wEntrepreneur;

    const addWEntrepreneur = (desi, name, phone, email, doj, image) => {
        const newData = ([...wEntrepreneur, { desi, name, phone, email, doj, image }]);

        setWEntrepreneur(newData);
        setWEFilteredData(newData);
    }

    /* update data */
    const updateWEntrepreneur = (id, updatedWM) => {
        setWEntrepreneur(wEntrepreneur?.map((Data) => Data._id === id ? updatedWM : Data))
    }

    /* ------------------------------WEntrepreneur End -----------------------------*/
    /* ------------------------------PMain Start -------------------------------*/

    // pMain
    const [pMain, setPMain] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/pmain`)
            .then(data => {
                setPMain(data.data);
                setIsLoading(true);
            })
    }, []);

    const pMainData = pMain[0];

    const addPMain = (image, name, location, title, description) => {
        const newData = ([...pMain, { image, name, location, title, description }]);
        setPMain(newData);
    }

    /* update data */
    const updatePMain = (id, updatedPC) => {
        setPMain(pMain?.map((Data) => Data._id === id ? updatedPC : Data))
    }

    // pbImage
    const [pbImage, setpbImage] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/pbimage`)
            .then(data => {
                setpbImage(data.data);
                setIsLoading(true);
            })
    }, []);

    // intro
    const [intro, setIntro] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/intro`)
            .then(data => {
                setIntro(data.data);
                setIsLoading(true);
            })
    }, []);

    // data table
    const [dataTable, setDataTable] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/data_table`)
            .then(data => {
                setDataTable(data.data[0]);
                setIsLoading(true);
            })
    }, []);


    /* ------------------------------PMain End -----------------------------*/
    /* ------------------------------PResident Start -------------------------------*/

    const [pResident, setPResident] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/president`)
            .then(data => {
                setPResident(data.data);
                setIsLoading(true);
            })
    }, []);

    const pResidentData = pResident[0];

    const addPResident = (image, name, location) => {
        const newData = ([...pResident, { image, name, location }]);

        setPResident(newData);
    }

    /* update data */
    const updatePResident = (id, updatedPC) => {
        setPResident(pResident?.map((Data) => Data._id === id ? updatedPC : Data))
    }

    /* ------------------------------PResident End -----------------------------*/
    /* ------------------------------PCommerce Start ---------------------------*/

    const [pCommerce, setPCommerce] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/pcommerce`)
            .then(data => {
                setPCommerce(data.data);
                setIsLoading(true);
            })
    }, []);

    const pCommerceData = pCommerce[0];

    const addPCommerce = (image, name, location) => {
        const newData = ([...pCommerce, { image, name, location }]);

        setPCommerce(newData);
    }

    /* update data */
    const updatePCommerce = (id, updatedPC) => {
        setPCommerce(pCommerce?.map((Data) => Data._id === id ? updatedPC : Data))
    }

    /* ------------------------------PCommerce End -----------------------------*/
    /* ------------------------------PContact Start ----------------------------*/

    const [pContact, setPContact] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/pcontact`)
            .then(data => {
                setPContact(data.data);
                setIsLoading(true);
            })
    }, []);

    const pContactData = pContact[0];

    const addPContact = (image, name, location) => {
        const newData = ([...pContact, { image, name, location }]);

        setPContact(newData);
    }

    /* update data */
    const updatePContact = (id, updatedPC) => {
        setPContact(pContact?.map((Data) => Data._id === id ? updatedPC : Data))
    }

    /* ------------------------------PCommerce End -----------------------------*/
    /* ------------------------------Notice Start ----------------------------*/

    const [notice, setNotice] = useState([]);
    const [runNotice, setRunNotice] = useState([]);

    // notice
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/notice`)
            .then(data => {
                setNotice(data.data);
                setIsLoading(true);
            })
    }, []);

    const addNotice = (title, subtitle, desc, image) => {
        const newData = ([...notice, { title, subtitle, desc, image }]);
        setNotice(newData);
    }

    const updateNotice = (id, updatedPC) => {
        setNotice(notice?.map((Data) => Data._id === id ? updatedPC : Data))
    }

    // run notice
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/run_notice`)
            .then(data => {
                setRunNotice(data.data);
                setIsLoading(true);
            })
    }, []);

    const addRunNotice = (title, notice) => {
        const newData = ([...runNotice, { title, notice }]);
        setRunNotice(newData);
    }

    const updateRunNotice = (id, updatedPC) => {
        setRunNotice(runNotice?.map((Data) => Data._id === id ? updatedPC : Data))
    }

    /* ------------------------------Notice End -----------------------------*/


    return (
        <>
            <DataContext.Provider value={{
                dLoading, updateDataTable,

                /* default */
                isLoading, totalData, homeData,

                /* resident */
                pageROffset, setPageROffset, pageRNumber, setPageRNumber, residentData, setResidents, rFilteredData, setRFilteredData, handleRWordFilter, handleRAllFilter, addResident, updateResident,

                /* commerce */
                pageNumber, setPageNumber, pageOffset, setPageOffset, commerceData, setCommerces, cFilteredData, setCFilteredData, handleCWordFilter, handleCAllFilter, addCommerce, updateCommerce,

                /* treasLicense */
                treadLicenseData, setTreadLicenses, tFilteredData,
                setTFilteredData, addTreadLicense, updateTreadLicense,

                /*   cCharacter*/
                cCharacterData, setCCharacters, chFilteredData,
                setChCharacterData, addCCharacter, updateCCharacter,
                /*   cNagork*/
                cNagorikData, setCNagoriks, cNFilteredData,
                setCNFilteredData, addCNagorik, updateCNagorik,
                /*   cOwarish*/
                cOwarishData, setCOwarishs, cOFilteredData,
                setCOFilteredData, addCOwarish, updateCOwarish,

                /*   WMember*/
                wMemberData, setWMember, wMFilteredData,
                setWMFilteredData, addWMember, updateWMember,
                /*   WEntrepreneur*/
                wEntrepreneurData, setWEntrepreneur, wEFilteredData,
                setWEFilteredData, addWEntrepreneur, updateWEntrepreneur,

                /*   PMain*/
                pMainData, setPMain, addPMain, updatePMain,
                pbImage, setpbImage,
                intro, setIntro,
                dataTable,
                /*   PResident*/
                pResidentData, setPResident, addPResident, updatePResident,
                /*   PCommerce*/
                pCommerceData, setPCommerce, addPCommerce, updatePCommerce,
                /*   PContact*/
                pContactData, setPContact, addPContact, updatePContact,

                /* notice */
                notice, setNotice, addNotice, updateNotice,
                runNotice, setRunNotice, addRunNotice, updateRunNotice

            }}>
                {props.children}
            </DataContext.Provider>
        </>
    )

}

export default DataContextProvider;