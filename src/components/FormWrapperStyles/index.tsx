import styled from "styled-components";

function clearfix(parent = "&"): any {
  const pseudoSelector = `${parent}::after`;
  return {
    [pseudoSelector]: {
      clear: "both",
      content: '""',
      display: "table",
    },
  };
}

export const FormWrapper = styled.div`
  width: 100%;
  ${clearfix()}
`;
type FormItemWrapperProps = {
  margin?: any;
  floatDirection?: string;
  labelWidth?: string;
};

export const FormItemWrapper = styled.div`
  float: ${(props: FormItemWrapperProps) => props.floatDirection || "left"};
  margin: ${(props: FormItemWrapperProps) => props.margin || "0 14px"};
  .ant-form-item-label label {
    display: inline-block;
    width: ${(props: FormItemWrapperProps) => props.labelWidth || "100px"};
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
