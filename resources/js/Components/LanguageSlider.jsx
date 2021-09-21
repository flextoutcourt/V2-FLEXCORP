import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import Language from "./Language";
import "./LanguageSlider.css";


export default function LanguageSlider(props) {
    const languages = [
        {
            title: 'HTML',
            icon: 'https://picsum.photos/45',
            color: '#DD4B25',
            description: 'test',
        },
        {
            title: 'CSS',
            icon: 'https://picsum.photos/45',
            color: '#254BDD',
            description: 'test',
        },
        {
            title: 'JS',
            icon: 'https://picsum.photos/45',
            color: '#EFD81D',
            description: 'test',
        },
        {
            title: 'PHP',
            icon: 'https://picsum.photos/45',
            color: "#8993be",
            description: 'test',
        },
        {
            title: 'React',
            icon: 'https://picsum.photos/45',
            color: '#61dbfb',
            description: 'test',
        },
        {
            title: 'Laravel',
            icon: 'https://picsum.photos/45',
            color: '#fb503b',
            description: 'test',
        },
        {
            title: 'React Native',
            icon: 'https://picsum.photos/45',
            color: '#61dbfb',
            description: 'test',
        },
        {
            title: 'Bootstrap',
            icon: 'https://picsum.photos/45',
            color: '#7310EF',
            description: 'test',
        },
        {
            title: 'TailwindCss',
            icon: 'https://picsum.photos/45',
            color: '#15B3C0',
            description: 'test',
        },
        {
            title: 'Jquery',
            icon: 'https://picsum.photos/45',
            color: '#0769AD',
            description: 'test',
        },
        {
            title: 'Mysql',
            icon: 'https://picsum.photos/45',
            color: '#00758F',
            description: 'test',
        },
        {
            title: 'Typo3',
            icon: 'https://picsum.photos/45',
            color: '#F49800',
            description: 'test',
        },
        {
            title: 'NodeJS',
            icon: 'https://picsum.photos/45',
            color: '#026E00',
            description: 'test',
        },
    ]
	const options = {
		size: 120,
		minSize: 10,
		gutter: 5,
		provideProps: true,
		numCols: 4,
		fringeWidth: 75,
		yRadius: 130,
		xRadius: 220,
		cornerRadius: 50,
		showGuides: false,
		compact: true,
		gravitation: 5
	}

	const children = languages.map((data, i) => {
		 return <Language data={data} className="child my-auto" key={i}/>
	});

	return (<BubbleUI options={options} className="myBubbleUI">
		{children}
	</BubbleUI>)
};