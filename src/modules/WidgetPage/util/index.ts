import { Widget } from '@/types';
import { TPersonsRespons } from '@/types/persons';

export const getWidgetContent = (person: TPersonsRespons) => {
  const content: Widget[] = [];

  for (const [key, value] of Object.entries(person) as [
    keyof typeof person,
    unknown,
  ][]) {
    if (key === 'id' || key === 'createdAt' || key === 'updatedAt') continue;

    const widgetData = {
      id: crypto.randomUUID(),
    };

    if (key === 'statusCode') {
      content.push({
        ...widgetData,
        type: 'status_selector',
        createdAt: person.createdAt,
        props: {
          status: value?.toString(),
        },
      });
    }

    if (key === 'rank') {
      content.push({
        ...widgetData,
        type: 'rank_selector',
        createdAt: person.createdAt,
        props: {
          rank: value?.toString(),
        },
      });
    }

    if (key === 'image' && value) {
      content.push({
        ...widgetData,
        type: 'main_image',
        createdAt: person.createdAt,
        props: {
          value: value?.toString(),
        },
      });
    }

    if (key === 'assignmentRole') {
      content.push({
        ...widgetData,
        type: 'assignment',
        createdAt: person.createdAt,
        props: {
          assignment: value?.toString(),
        },
      });
    }

    if (key === 'content') {
      content.push({
        ...widgetData,
        type: 'editor',
        createdAt: person.createdAt,
        props: {
          content: typeof value === 'string' ? value : JSON.stringify(value),
        },
      });
    }
  }

  return content;
};

export const formatWidgetsDataForUpdateUser = (
  widgets: Widget[],
  person: TPersonsRespons,
): TPersonsRespons => {
  const updatedData: TPersonsRespons = {} as TPersonsRespons;

  widgets.forEach((widget) => {
    switch (widget.type) {
      case 'status_selector':
        updatedData.statusCode =
          widget.props?.status?.toString() || person.statusCode;
        break;
      case 'rank_selector':
        updatedData.rank = widget.props?.rank?.toString() || person.rank;
        break;
      case 'main_image':
        updatedData.image = widget.props?.value?.toString() || person.image;
        break;
      case 'assignment':
        updatedData.assignmentRole =
          widget.props?.assignment?.toString() || person.assignmentRole;
        break;

      case 'editor':
        try {
          updatedData.content = widget.props?.content
            ? typeof widget.props.content === 'string'
              ? JSON.parse(widget.props.content)
              : widget.props.content
            : person.content;
        } catch (error) {
          console.error('Error parsing content:', error);
          updatedData.content = person.content; // Fallback to original content on error
        }

        break;
      default:
        break;
    }
  });

  return {
    ...person,
    ...updatedData,
  };
};
