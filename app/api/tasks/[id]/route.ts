import { tasks } from "../data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const taskId = Number(id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
  return Response.json(
    { error: "Task not found" },
    { status: 404 }
  );
}

return Response.json(
  { data: task },
  { status: 200 }
);
}


export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const taskId = Number(id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return Response.json(
      { error: "Task not found" },
      { status: 404 }
    );
  }

  const body = await request.json();

  if (Object.keys(body).length === 0) {
    return Response.json(
      { error: "No update data provided" },
      { status: 400 }
    );
  }

  if (body.title !== undefined) {
    task.title = body.title;
  }

  if (body.completed !== undefined) {
    task.completed = body.completed;
  }

  return Response.json(
    { data: task },
    { status: 200 }
  );
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const taskId = Number(id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return Response.json(
      { error: "Task not found" },
      { status: 404 }
    );
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  return Response.json(
    { data: deletedTask },
    { status: 200 }
  );
}