import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import awsmobile from '../../../../../aws-exports';

const containerElementName = 'faceLivenessReactContainer';

@Component({
    selector: 'app-faceliveness-react-wrapper',
    template: `<span #${containerElementName}></span>`,
    styleUrls: ['./faceLivenessReactWrapperComponent.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FaceLivenessReactWrapperComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;

    @Input() public counter = 10;
    @Input() public sessionId = null;
    @Output() public livenessResults = new EventEmitter<any>();
    @Output() public livenessErrors = new EventEmitter<any>();
    region = awsmobile['aws_project_region']

    constructor() {
    }

    ngOnInit(): void {
        console.log('Component Loaded' + this.sessionId)
    }

    ngOnChanges(): void {
        this.render();
    }

    ngAfterViewInit() {
        this.render();
    }

    ngOnDestroy() {
        ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
    }

    handleAnalysisComplete = async () => {
        let res = await fetch(`http://172.16.108.38/liveness/apiGet?sessionId=${this.sessionId}`);
        res = await res.json();

        this.livenessResults.emit(res);
    }

    handleError = async (err: any) => {
        this.livenessErrors.emit(err);
    }

    private render() {
        ReactDOM.render(
            <React.StrictMode>
                <div id='faceLivenessDetectorContainer'>
                    <FaceLivenessDetector 
                        sessionId={this.sessionId} 
                        region={this.region} 
                        onAnalysisComplete={this.handleAnalysisComplete}
                        onError={this.handleError}
                        disableInstructionScreen={true}
                    />
                </div>
            </React.StrictMode>,
            this.containerRef.nativeElement
        );
    }
}
