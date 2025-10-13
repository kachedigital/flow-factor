import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CBT Techniques - MindShift Tools",
  description:
    "Explore various Cognitive Behavioral Therapy (CBT) techniques to manage anxiety and improve mental well-being.",
}

export const dynamic = "force-dynamic"

const TechniquesPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">CBT Techniques</h1>
      <p className="mb-4">
        Cognitive Behavioral Therapy (CBT) offers a range of techniques to help you identify and change negative
        thinking patterns and behaviors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Technique Card - Replace with actual techniques */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Cognitive Restructuring</h2>
          <p className="text-gray-700">
            Learn to identify and challenge negative thoughts, replacing them with more balanced and realistic ones.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Behavioral Activation</h2>
          <p className="text-gray-700">
            Increase engagement in enjoyable activities to improve mood and reduce feelings of depression.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Exposure Therapy</h2>
          <p className="text-gray-700">
            Gradually expose yourself to feared situations or objects to reduce anxiety and avoidance behaviors.
          </p>
        </div>
        {/* End Example Technique Cards */}
      </div>
    </div>
  )
}

export default TechniquesPage
