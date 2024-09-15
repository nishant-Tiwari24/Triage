import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import axios from 'axios';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: '', dangerouslyAllowBrowser: true
});

const SampleInfo = () => {
    const [sampleData, setSampleData] = useState(null);
    const [analysis, setAnalysis] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/sample_info');
                setSampleData(response.data);
                if (response.data) {
                    performAnalysis(response.data);
                }
            } catch (error) {
                console.error('Error fetching sample info:', error);
            }
        };

        fetchData();
    }, []);

    const performAnalysis = async (data) => {
        try {
            const chatCompletion = await client.chat.completions.create({
                messages: [{ role: 'user', content: `Analyze this data and give output in string in small points: ${data}` }],
                model: 'gpt-4o-mini',
            });

            setAnalysis(chatCompletion.choices[0].message.content);
        } catch (error) {
            console.error('Error performing analysis:', error);
            setAnalysis('Unable to perform analysis at this time.');
        }
    };

    return (
        <div className="flex min-h-screen bg-zinc-900 text-white">
            <div className="w-[400px]">
                <Sidebar />
            </div>

            <div className="flex-grow p-8">
                <h1 className="text-2xl font-normal mb-6">Sample Information 🧪</h1>

                {sampleData ? (
                    <div>
                        <pre className="bg-zinc-800 p-4 rounded-lg overflow-auto text-gray-200 w-[1300px] h-[600px]">
                            {sampleData}
                        </pre>

                        <h2 className="text-xl font-normal mt-6">Analysis of the Sample Data</h2>

                        <div className="bg-zinc-800 p-4 rounded-lg overflow-auto text-gray-200 mt-4 w-[1300px] h-[300px]">
                            {analysis ? (
                                <p>{analysis}</p>
                            ) : (
                                <p>Analyzing data...</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>No sample data found.</p>
                )}
            </div>
        </div>
    );
};

export default SampleInfo;
