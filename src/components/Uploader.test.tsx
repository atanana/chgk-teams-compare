import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Uploader from './Uploader';
import Mock = jest.Mock;

const onFileSelectedMock: Mock<(files: FileList | null) => void> = jest.fn();

it('renders without crashing', () => {
    const component = renderer.create(<Uploader onFileSelected={onFileSelectedMock}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('calls callback on file select', () => {
    const uploader = shallow(<Uploader onFileSelected={onFileSelectedMock}/>);
    const input = uploader.find('input');
    const files: Mock<FileList> = jest.fn();
    input.simulate('change', { target: { files } });

    expect(onFileSelectedMock.mock.calls.length).toBe(1);
    expect(onFileSelectedMock.mock.calls[0][0]).toBe(files);
});