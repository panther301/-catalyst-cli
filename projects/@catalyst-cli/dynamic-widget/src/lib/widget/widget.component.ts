import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { IWidget } from './widget.model';

@Component({
  selector: 'catalyst-widget',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent {
  widgets = input<IWidget[]>([]);
  isEdit = input<boolean>(false);

  @Output() widgetUpdated = new EventEmitter<{
    id: number;
    left: number;
    top: number;
    width: number;
    height: number;
  }>();

  @Output() widgetDeleted = new EventEmitter<number>();

  private isDragging = false;
  private dragType:
    | 'move'
    | 'resize'
    | 'resize-top'
    | 'resize-left'
    | 'resize-right'
    | 'resize-bottom'
    | 'resize-top-left'
    | 'resize-top-right'
    | 'resize-bottom-left'
    | 'resize-bottom-right'
    | null = null;

  private activeWidget: IWidget | null = null;
  private initialMouseX = 0;
  private initialMouseY = 0;
  private initialLeft = 0;
  private initialTop = 0;
  private initialWidth = 0;
  private initialHeight = 0;
  private maxGridSize = 12;

  startDrag(
    event: MouseEvent,
    type:
      | 'move'
      | 'resize'
      | 'resize-top'
      | 'resize-left'
      | 'resize-right'
      | 'resize-bottom'
      | 'resize-top-left'
      | 'resize-top-right'
      | 'resize-bottom-left'
      | 'resize-bottom-right',
    widget: IWidget,
  ) {
    event.preventDefault();
    this.isDragging = true;
    this.dragType = type;
    this.activeWidget = widget;
    this.initialMouseX = event.clientX;
    this.initialMouseY = event.clientY;
    this.initialLeft = widget.left;
    this.initialTop = widget.top;
    this.initialWidth = widget.width;
    this.initialHeight = widget.height;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging || !this.activeWidget || !this.isEdit()) return;
    const stepX = 100 / this.maxGridSize; // Each step is a percentage
    const stepY = 100 / this.maxGridSize; // Each step is a percentage

    const deltaX = ((event.clientX - this.initialMouseX) / window.innerWidth) * 100;
    const deltaY = ((event.clientY - this.initialMouseY) / window.innerHeight) * 100;

    switch (this.dragType) {
      case 'move':
        this.moveWidget(deltaX, deltaY, stepX, stepY);
        break;
      case 'resize-left':
        this.resizeLeft(deltaX, stepX);
        break;
      case 'resize-right':
        this.resizeRight(deltaX, stepX);
        break;
      case 'resize-top':
        this.resizeTop(deltaY, stepY);
        break;
      case 'resize-bottom':
        this.resizeBottom(deltaY, stepY);
        break;
      case 'resize-top-left':
        this.resizeTop(deltaY, stepY);
        this.resizeLeft(deltaX, stepX);
        break;
      case 'resize-top-right':
        this.resizeTop(deltaY, stepY);
        this.resizeRight(deltaX, stepX);
        break;
      case 'resize-bottom-left':
        this.resizeBottom(deltaY, stepY);
        this.resizeLeft(deltaX, stepX);
        break;
      case 'resize-bottom-right':
        this.resizeBottom(deltaY, stepY);
        this.resizeRight(deltaX, stepX);
        break;
    }

    this.emitWidgetUpdate();
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.isDragging = false;
    this.dragType = null;
    this.activeWidget = null;
  }

  private moveWidget(deltaX: number, deltaY: number, stepX: number, stepY: number) {
    if (!this.activeWidget) return;

    this.activeWidget.left = Math.max(0, this.initialLeft + deltaX);
    this.activeWidget.top = Math.max(0, this.initialTop + deltaY);
  }

  private resizeLeft(deltaX: number, stepX: number) {
    if (!this.activeWidget) return;

    const newLeft = this.initialLeft + deltaX;
    const newWidth = this.initialWidth - deltaX;

    if (newWidth > stepX) {
      this.activeWidget.left = Math.max(0, newLeft);
      this.activeWidget.width = newWidth;
    }
  }

  private resizeRight(deltaX: number, stepX: number) {
    if (!this.activeWidget) return;

    const newWidth = this.initialWidth + deltaX;
    if (newWidth > stepX) {
      this.activeWidget.width = newWidth;
    }
  }

  private resizeTop(deltaY: number, stepY: number) {
    if (!this.activeWidget) return;

    const newTop = this.initialTop + deltaY;
    const newHeight = this.initialHeight - deltaY;

    if (newHeight > stepY) {
      this.activeWidget.top = Math.max(0, newTop);
      this.activeWidget.height = newHeight;
    }
  }

  private resizeBottom(deltaY: number, stepY: number) {
    if (!this.activeWidget) return;

    const newHeight = this.initialHeight + deltaY;
    if (newHeight > stepY) {
      this.activeWidget.height = newHeight;
    }
  }

  private emitWidgetUpdate() {
    if (!this.activeWidget || !this.isEdit()) return;
    this.widgetUpdated.emit({
      id: this.activeWidget.id,
      left: this.activeWidget.left,
      top: this.activeWidget.top,
      width: this.activeWidget.width,
      height: this.activeWidget.height,
    });
  }

  /**
   * Handle widget deletion
   */
  deleteWidget(event: MouseEvent, widgetId: number): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.canDeleteWidget(widgetId)) {
      this.widgetDeleted.emit(widgetId);
    }
  }

  /**
   * Check if widget can be deleted
   */
  private canDeleteWidget(widgetId: number): boolean {
    const widget = this.widgets().find((w) => w.id === widgetId);
    if (!widget) return false;
    if (widget.locked) return false;
    return widget.constraints?.deletable ?? true;
  }
}
