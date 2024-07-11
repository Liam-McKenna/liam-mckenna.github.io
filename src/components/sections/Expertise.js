import React from 'react'

const Expertise = () => {

    const cardsData = [
        {
            title: 'Software Engineer',
            description: 'Full-stack developer with a strong background in Python and JavaScript, skilled in designing user interfaces, building APIs, automating testing, and deploying with Docker and DevOps.'
        }, {
            title: 'Frontend & Graphic Designer',
            description: 'Advocate for good UI/UX. 4 years of traditional graphic and video design & 2 years developing Frontend UI in React and Next'
        }, {
            title: 'API Developer & Database Design',
            description: 'Skilled in building and integrating RESTful APIs using Django REST Framework, and adept at designing and manipulating SQL databases for robust data management.'
        }
    ]

    const Card = ({ data }) => {
        return (
            <div>
                <div>{data.title}</div>
                <div>{data.description}</div>
            </div>
        )
    }

    return (
        <div id="expertise">
            <h1 className="flex justify-center">Expertise</h1>
            <Card data={cardsData} />
        </div>
    )
}

export default Expertise