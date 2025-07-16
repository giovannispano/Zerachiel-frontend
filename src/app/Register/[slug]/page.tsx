import { MouseEvent } from "react";
import { Button } from "@/components/ui/button"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (<div>
    <h1>Test</h1>
    <p>{slug}</p>
    <Button>Cliccami</Button>
  </div>
  )
}