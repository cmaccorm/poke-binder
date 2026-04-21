import { getBinder } from "@/lib/binders";
import { notFound } from "next/navigation";
import BinderViewer from "@/components/BinderViewer";

interface BinderPageProps {
  params: Promise<{ binderId: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function BinderPage({ params, searchParams }: BinderPageProps) {
  const { binderId } = await params;
  const { page: pageStr } = await searchParams;
  const binder = await getBinder(binderId);

  if (!binder) {
    notFound();
  }

  const initialPage = pageStr ? parseInt(pageStr, 10) : binder.lastViewedPage;

  return (
    <BinderViewer
      binder={binder}
      initialPage={isNaN(initialPage) ? 0 : initialPage}
    />
  );
}
