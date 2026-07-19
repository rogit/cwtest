import {effect, Injectable, Service, Signal, signal, WritableSignal} from '@angular/core';
import {Annotation, Document, Page} from '../../models/document.model';
import {httpResource, HttpResourceRef} from '@angular/common/http';

@Service()
export class DocumentService {
  private document = signal<Document | undefined>(undefined);

  public getDocument(id: () => number): Signal<Document | undefined> {
    const docResource = httpResource<Document>(() => {
      return `/${id()}.json`;
    });
    effect(() => {
      this.document.set(docResource.value());
    });
    return this.document.asReadonly();
  }

  public save(): void {
    console.log(this.document());
  }

  public addAnnotation(annotation: Omit<Annotation, 'id'>, pageNumber: number): void {
    this.document.update((value: Document | undefined) => {
      if (value) {
        const newPages = value.pages.map((page: Page) => {
          if (page.number === pageNumber) {
            return {
              ...page,
              annotations: [...(page.annotations || []), {
                id: Math.random(),
                ...annotation,
              }],
            };
          }
          return page;
        })
        return {
          ...value,
          pages: newPages,
        }
      } else {
        return undefined;
      }
    })
  }

  public moveAnnotation(id: number, x: number, y: number): void {
    this.document.update((value: Document | undefined) => {
      if (value) {
        return {
          ...value,
          pages: value.pages.map((page: Page) => {
            return {
              ...page,
              annotations: page.annotations?.map((annotation: Annotation) => {
                if (annotation.id === id) {
                  return {
                    ...annotation,
                    x,
                    y,
                  }
                } else {
                  return annotation;
                }
              }) ?? [],
            }
          }),
        }
      } else {
        return undefined;
      }
    })
  }

  public deleteAnnotation(id: number): void {
    this.document.update((value: Document | undefined) => {
      if (value) {
        return {
          ...value,
          pages: value.pages.map((page: Page) => {
            return {
              ...page,
              annotations: page.annotations?.filter((annotation: Annotation) => annotation.id !== id) ?? [],
            }
          }),
        }
      } else {
        return undefined;
      }
    })
  }
}
