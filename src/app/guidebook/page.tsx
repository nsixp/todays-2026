import { getGuidebook } from "@/lib/data"
import GuidebookViewer from "@/components/guidebook-viewer"

export default function GuidebookPage() {
  const sections = getGuidebook()
  return <GuidebookViewer sections={sections} />
}
